import { ObjectId, Collection, Filter, DeepPartial } from "typeorm";

export interface Select {
  [key: string]: 1 | 0;
}

export interface Sort {
  [key: string]: 1 | -1;
}

export interface IRepository<T> {
  get(id: ObjectId, select?: Select): Promise<T>;
  create(data: DeepPartial<T>): Promise<ObjectId>;
  createMany(data: DeepPartial<T[]>): Promise<T[]>;
  update(
    filter: Filter<T>,
    data: DeepPartial<T>,
    multi: boolean
  ): Promise<void>;
  updateById(ids: ObjectId | ObjectId[], data: DeepPartial<T>): Promise<void>;
  find(
    filter: Filter<DeepPartial<T>>,
    limit: number,
    page?: number,
    select?: Select,
    sort?: Sort
  ): Promise<T[]>;
  findById(id: ObjectId, select?: Select): Promise<T>;
  remove(filter: Filter<T>, multi: boolean): Promise<void>;
  removeById(id: ObjectId | ObjectId[]): Promise<void>;
  getCollection(): Collection;
}
