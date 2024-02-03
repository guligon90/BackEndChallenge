import { HttpCode } from "../enums";
import { BaseError } from "./base-error";

export class BadRequestError extends BaseError {
    statusCode = HttpCode.BAD_REQUEST;

    constructor(public message: string) {
        super(message);

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}
