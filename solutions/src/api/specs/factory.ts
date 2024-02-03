import { OpenAPIV3 } from "express-openapi-validator/dist/framework/types";

const ApiSpecFactory = () => {
    let apiSpecDocument: OpenAPIV3.Document;

    const applyBasicInfo = (title: string, openApiVersion = "3.0.0", apiVersion = "1.0.0") => {
        apiSpecDocument = {
            ...apiSpecDocument,
            openapi: openApiVersion,
            info: {
                title,
                version: apiVersion,
            },
        };

        return api;
    };

    const applyServers = (servers: OpenAPIV3.ServerObject[]) => {
        apiSpecDocument = {
            ...apiSpecDocument,
            servers,
        };

        return api;
    };

    const applyTags = (tags: OpenAPIV3.TagObject[]) => {
        apiSpecDocument = {
            ...apiSpecDocument,
            tags,
        };

        return api;
    };

    const applyPaths = (paths: OpenAPIV3.PathsObject) => {
        apiSpecDocument = {
            ...apiSpecDocument,
            paths,
        };

        return api;
    };

    const document = (): OpenAPIV3.Document => apiSpecDocument;

    const api = {
        applyBasicInfo,
        applyServers,
        applyTags,
        applyPaths,
        document,
    };

    return api;
};

export { ApiSpecFactory };
