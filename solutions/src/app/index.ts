import "express-async-errors";

import cors from "cors";
import { json } from "body-parser";
import express, { Application } from "express";

import { apiRouter } from "@src/routes";
import { apiSpec } from "@api/specs";
import { NotFoundError } from "@sdk/exceptions";
import { errorHandler, requestLogger, swaggerUiMiddleware } from "@sdk/middlewares";

const applicationFactory = (): Application => {
    const app: Application = express();

    app.use(cors());
    app.use(json());
    app.use(requestLogger);
    app.use(apiRouter);
    app.use(swaggerUiMiddleware(apiSpec));

    app.all("*", async () => {
        throw new NotFoundError();
    });

    app.use(errorHandler);

    return app;
};

export { applicationFactory };
