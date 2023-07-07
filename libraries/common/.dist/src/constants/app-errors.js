"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryMissingField = exports.InvalidIdError = exports.InternalError = exports.MissingFieldError = exports.NotFoundError = exports.ForbiddenError = exports.UnauthorizedError = exports.BadRequestError = exports.ApplicationError = void 0;
const constants_1 = __importDefault(require("./constants"));
class ApplicationError extends Error {
    constructor(code, message, ...args) {
        super(...args);
        this.code = -1;
        this.code = code;
        this.message = message;
    }
}
exports.ApplicationError = ApplicationError;
class BadRequestError extends ApplicationError {
    constructor(message, ...args) {
        super(400, message, ...args);
    }
}
exports.BadRequestError = BadRequestError;
class UnauthorizedError extends ApplicationError {
    constructor(message) {
        super(401, message ? message : "Unauthorized");
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends ApplicationError {
    constructor(message, ...args) {
        super(403, message ? message : "Forbidden", args);
    }
}
exports.ForbiddenError = ForbiddenError;
class NotFoundError extends ApplicationError {
    constructor(message, ...args) {
        super(404, message ? message : "Not Found", args);
    }
}
exports.NotFoundError = NotFoundError;
class MissingFieldError extends BadRequestError {
    constructor(fieldName, ...args) {
        super(`${fieldName} is required`, args);
    }
}
exports.MissingFieldError = MissingFieldError;
class InternalError extends ApplicationError {
    constructor(message, ...args) {
        super(500, message ? message : "Internal Server Error", args);
    }
}
exports.InternalError = InternalError;
class InvalidIdError extends BadRequestError {
    constructor(...args) {
        super(constants_1.default.REPOSITORY_ERROR_INVALID_ID, args);
    }
}
exports.InvalidIdError = InvalidIdError;
class RepositoryMissingField extends BadRequestError {
    constructor(...args) {
        super("Field missing", args);
    }
}
exports.RepositoryMissingField = RepositoryMissingField;
