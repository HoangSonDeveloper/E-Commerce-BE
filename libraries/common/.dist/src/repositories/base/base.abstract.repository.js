"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
const utils_1 = require("../../utils/utils");
class Repository {
    constructor(dbInstance, collectionName) {
        this.dbInstance = dbInstance;
        this.collectionName = collectionName;
    }
    get(id, select = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const objectId = (0, utils_1.getValidObjectId)(id);
            const collection = this.getCollection();
            const doc = (yield collection.findOne({ _id: objectId }, select));
            return doc;
        });
    }
    find(filter = {}, limit = 10, page = 0, select, sort) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = this.getCollection();
            const query = collection.find(filter, select);
            if (sort) {
                query.sort(sort);
            }
            if (page > 0) {
                const skip = limit * (page - 1);
                query.skip(skip);
            }
            query.limit(limit);
            const docs = yield query.toArray();
            return docs;
        });
    }
    findById(id, select) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield this.getCollection().findOne({ _id: id }, select);
            return doc;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data) {
                throw new Error("Empty object provided");
            }
            const collection = this.getCollection();
            const objectId = (yield collection.insertOne(data)).insertedId;
            return objectId;
        });
    }
    createMany(_data) {
        throw new Error("Method not implemented.");
    }
    update(_filter, _data, _multi) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    updateById(ids, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let objectIds = [];
            if (Array.isArray(ids)) {
                objectIds = ids.map((id) => (0, utils_1.getValidObjectId)(id));
            }
            else {
                objectIds = [(0, utils_1.getValidObjectId)(ids)];
            }
            const collection = this.getCollection();
            yield collection.updateOne({ _id: { $in: objectIds } }, data);
        });
    }
    remove(filter, multi) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = this.getCollection();
            if (multi) {
                yield collection.deleteMany(filter);
            }
            else {
                yield collection.deleteOne(filter);
            }
        });
    }
    removeById(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            let objectIds = [];
            if (Array.isArray(ids)) {
                objectIds = ids.map((id) => (0, utils_1.getValidObjectId)(id));
            }
            else {
                objectIds = [(0, utils_1.getValidObjectId)(ids)];
            }
            const collection = this.getCollection();
            yield collection.deleteMany({ _id: { $in: objectIds } });
        });
    }
    getCollection() {
        return this.dbInstance.getCollection(this.collectionName);
    }
}
exports.Repository = Repository;
