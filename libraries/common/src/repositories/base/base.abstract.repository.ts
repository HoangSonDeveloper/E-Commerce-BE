import { Filter, ObjectId, Collection, DeepPartial, Document } from "typeorm";
import { IRepository, Select, Sort } from "./base.interface.repository";
import { getValidObjectId } from "../../utils/utils";

export abstract class Repository<T> implements IRepository<T> {
  private dbInstance: any;
  private collectionName: string;
  protected constructor(dbInstance: any, collectionName: string) {
    this.dbInstance = dbInstance;
    this.collectionName = collectionName;
  }

  public async get(id: ObjectId, select: Select = {}): Promise<T> {
    const objectId = getValidObjectId(id);

    const collection = this.getCollection();

    const doc: T = (await collection.findOne<T>(
      { _id: objectId },
      select
    )) as T;

    return doc;
  }

  public async find(
    filter: Filter<DeepPartial<T>> = {},
    limit = 10,
    page = 0,
    select?: Select,
    sort?: Sort
  ): Promise<T[]> {
    const collection = this.getCollection();
    const query = collection.find(filter as Document, select);

    if (sort) {
      query.sort(sort);
    }

    if (page > 0) {
      const skip = limit * (page - 1);
      query.skip(skip);
    }

    query.limit(limit);

    const docs = await query.toArray();

    return docs as T[];
  }

  public async findById(id: ObjectId, select?: Select): Promise<T> {
    const doc = await this.getCollection().findOne<T>({ _id: id }, select);
    return doc as T;
  }

  public async create(data: DeepPartial<T>): Promise<ObjectId> {
    if (!data) {
      throw new Error("Empty object provided");
    }

    const collection = this.getCollection();
    const objectId = (await collection.insertOne(data)).insertedId;

    return objectId;
  }

  public createMany(_data: DeepPartial<T[]>): Promise<T[]> {
    throw new Error("Method not implemented.");
  }

  public async update(
    _filter: Filter<T>,
    _data: DeepPartial<T>,
    _multi: boolean
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async updateById(ids: ObjectId | ObjectId[], data: DeepPartial<T>) {
    let objectIds = [];

    if (Array.isArray(ids)) {
      objectIds = ids.map((id) => getValidObjectId(id));
    } else {
      objectIds = [getValidObjectId(ids as ObjectId)];
    }

    const collection = this.getCollection();
    await collection.updateOne({ _id: { $in: objectIds } }, data as Document);
  }

  public async remove(filter: Filter<T>, multi: boolean): Promise<void> {
    const collection = this.getCollection();
    if (multi) {
      await collection.deleteMany(filter as Filter<Document>);
    } else {
      await collection.deleteOne(filter as Filter<Document>);
    }
  }

  public async removeById(ids: ObjectId | ObjectId[]): Promise<void> {
    let objectIds = [];

    if (Array.isArray(ids)) {
      objectIds = ids.map((id) => getValidObjectId(id));
    } else {
      objectIds = [getValidObjectId(ids as ObjectId)];
    }

    const collection = this.getCollection();
    await collection.deleteMany({ _id: { $in: objectIds } });
  }

  public getCollection(): Collection {
    return this.dbInstance.getCollection(this.collectionName);
  }
}
