"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValidObjectId = void 0;
const mongodb_1 = require("mongodb");
const app_errors_1 = require("../constants/app-errors");
function getValidObjectId(id) {
    if (!mongodb_1.ObjectId.isValid(id)) {
        throw new app_errors_1.InvalidIdError();
    }
    if (typeof id === "string") {
        id = new mongodb_1.ObjectId(id);
    }
    return id;
}
exports.getValidObjectId = getValidObjectId;
