import { BaseError } from "@sdk/exceptions";

class APIException extends BaseError {
    public message!: string;
    public statusCode!: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;

        Object.setPrototypeOf(this, APIException.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}

export { APIException };
