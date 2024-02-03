import { HttpCode } from "../enums";
import { BaseError } from "./base-error";

export class NotFoundError extends BaseError {
    statusCode = HttpCode.NOT_FOUND;

    constructor(message?: string) {
        super(message || "Route not found");

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}
