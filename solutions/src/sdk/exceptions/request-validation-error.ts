import { ValidationError } from "express-validator";
import { BaseError } from "./base-error";
import { HttpCode } from "../enums";

export class RequestValidationError extends BaseError {
    statusCode = HttpCode.BAD_REQUEST;

    constructor(public errors: ValidationError[]) {
        super("Invalid request parameters");

        // Only because we are extending a built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        return this.errors.map((err) => {
            return {
                message: err.msg,
                type: err.type,
                ...(err.type === "field" && { field: err.path }),
            };
        });
    }
}
