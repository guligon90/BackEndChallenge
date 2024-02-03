interface IApplication {
    applicationId?: string;
    name: string;
    domain: string;
    isAllowedOrigin?: boolean;
    isActive?: boolean;
    slug?: string;
    clientId?: string;
    description?: string;
    cacheId?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export { IApplication };
