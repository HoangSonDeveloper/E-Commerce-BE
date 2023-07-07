import { Request, Response, NextFunction, Application } from "express";
import {
  NotFoundError,
  ApplicationError,
  ForbiddenError,
} from "../constants/app-errors";
import { MongoError } from "typeorm";
import logger from "@learnbox/logger";

// Wraps async functions, catching all errors and sending them forward to express error handler
export function asyncWrap(controller: CallableFunction) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

export function errorHandlerMiddleware(app: Application) {
  // If you are lost
  app.use(() => {
    throw new NotFoundError("Not found");
  });

  // Request error handler
  app.use(
    (
      error: ApplicationError,
      _req: Request,
      res: Response,
      next: NextFunction
    ) => {
      if (error instanceof ApplicationError) {
        logger.error(error?.message, error.stack);
        if (error.message) {
          return res.status(error.code).send({ message: error.message });
        } else {
          return res.sendStatus(error.code);
        }
      }

      next(error);
    }
  );

  // Log all errors
  app.use(function (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const userString = "unknown user";

    if (err instanceof MongoError) {
      if (err.code === 11000) {
        logger.error(
          `${req.method} ${req.path}: MongoDB duplicate entry from ${userString}`
        );
      } else {
        logger.error(
          `${req.method} ${req.path}: Unhandled MongoDB error ${userString}. ${err.errmsg}`
        );
      }

      if (!res.headersSent) {
        return res.sendStatus(500);
      }
    } else if (err instanceof Error) {
      logger.error(
        `${req.method} ${req.path}: Unhandled request error ${userString}. ${err.message}`
      );
    } else if (typeof err === "string") {
      logger.error(
        `${req.method} ${req.path}: Unhandled request error ${userString}. ${err}`
      );
    }

    next(err);
  });

  // Optional fallthrough error handler
  app.use(function (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) {
    res.statusCode = 500;
    res.end(err.message + "\n");
  });
}
