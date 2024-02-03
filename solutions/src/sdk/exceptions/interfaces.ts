interface IBaseErrorPayload {
    message: string;
    field?: string | undefined;
}

interface IErrorPayload {
    status: number;
    name: string;
    errors: (IBaseErrorPayload | string)[];
}

export { IBaseErrorPayload, IErrorPayload };
