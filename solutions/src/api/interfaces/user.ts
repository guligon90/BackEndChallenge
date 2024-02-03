interface IUser {
    userId?: string;
    firstName?: string;
    lastName?: string;
    cpf?: string;
    email?: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export { IUser };
