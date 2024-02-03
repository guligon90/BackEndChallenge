import { Application } from "express";
import { Logger } from "winston";
import http, { Server } from "http";
import { createHttpTerminator } from "http-terminator";

import { IAppConfig } from "@app/config";
import { environmentMsg, validateAppConfig } from "./helpers";
import { declareProcessListeners } from "./process";

const serverFactory = (app: Application): Server => {
    const server = http.createServer(app);
    const httpTerminator = createHttpTerminator({
        server,
    });

    declareProcessListeners(httpTerminator, server);

    return server;
};

const startServer = (app: Application, server: Server, config: IAppConfig, logger: Logger) => {
    const errors = validateAppConfig(config);

    logger.info("Loading environmental variables...");
    logger.warn(environmentMsg(config));

    if (errors.length > 0) {
        for (const msg of errors) {
            logger.error(msg);
        }

        process.kill(process.pid, "SIGINT");
    }

    logger.info("Service parameters set correctly. Initiating server...");

    const {
        server: { port },
    } = config;

    server = app.listen(port, () => {
        logger.info(`All set. Application server listening at ${port}`);
    });
};

export { serverFactory, startServer };
