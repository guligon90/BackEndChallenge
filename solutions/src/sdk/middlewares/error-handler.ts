import { Request, Response, NextFunction } from "express";

import { BaseError } from "../exceptions/base-error";
import { Logger } from "../logging";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const logger = Logger(`${err.name} @ ${__filename}`);

    const isBaseError = err instanceof BaseError;
    const status = isBaseError ? err.statusCode : 500;

    const payload = {
        status,
        name: err.constructor.name.trim(),
        errors: isBaseError ? err.serializeErrors() : [{ message: (err.message || "Something went wrong").trim() }],
    };

    if (!isBaseError) {
        logger.error(err);
    }

    return res.status(status).send(payload);
};
