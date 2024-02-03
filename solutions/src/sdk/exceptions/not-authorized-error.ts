import { HttpCode } from "../enums";
import { BaseError } from "./base-error";

export class NotAuthorizedError extends BaseError {
    statusCode = HttpCode.UNAUTHORIZED;

    constructor(public message: string) {
        super(message);

        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}
