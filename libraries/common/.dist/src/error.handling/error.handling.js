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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = exports.asyncWrap = void 0;
const app_errors_1 = require("../constants/app-errors");
const typeorm_1 = require("typeorm");
const logger_1 = __importDefault(require("@learnbox/logger"));
// Wraps async functions, catching all errors and sending them forward to express error handler
function asyncWrap(controller) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield controller(req, res, next);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.asyncWrap = asyncWrap;
function errorHandlerMiddleware(app) {
    // If you are lost
    app.use(() => {
        throw new app_errors_1.NotFoundError("Not found");
    });
    // Request error handler
    app.use((error, _req, res, next) => {
        if (error instanceof app_errors_1.ApplicationError) {
            logger_1.default.error(error === null || error === void 0 ? void 0 : error.message, error.stack);
            if (error.message) {
                return res.status(error.code).send({ message: error.message });
            }
            else {
                return res.sendStatus(error.code);
            }
        }
        next(error);
    });
    // Log all errors
    app.use(function (err, req, res, next) {
        const userString = "unknown user";
        if (err instanceof typeorm_1.MongoError) {
            if (err.code === 11000) {
                logger_1.default.error(`${req.method} ${req.path}: MongoDB duplicate entry from ${userString}`);
            }
            else {
                logger_1.default.error(`${req.method} ${req.path}: Unhandled MongoDB error ${userString}. ${err.errmsg}`);
            }
            if (!res.headersSent) {
                return res.sendStatus(500);
            }
        }
        else if (err instanceof Error) {
            logger_1.default.error(`${req.method} ${req.path}: Unhandled request error ${userString}. ${err.message}`);
        }
        else if (typeof err === "string") {
            logger_1.default.error(`${req.method} ${req.path}: Unhandled request error ${userString}. ${err}`);
        }
        next(err);
    });
    // Optional fallthrough error handler
    app.use(function (err, _req, res, _next) {
        res.statusCode = 500;
        res.end(err.message + "\n");
    });
}
exports.errorHandlerMiddleware = errorHandlerMiddleware;
