import { HttpTerminator } from "http-terminator";
import { Server } from "http";

import { handleGracefulExit } from "@sdk/middlewares";
import { Logger } from "@sdk/logging";

const declareProcessListeners = (httpTerminator: HttpTerminator, server: Server) => {
    const logger = Logger(`solutions@${__filename}`);

    process.on("unhandledRejection", (reason: Error | undefined) => {
        logger.info(`Unhandled Rejection: ${reason?.message || reason}`);

        throw new Error(reason?.message || reason?.toString());
    });

    process.on("uncaughtException", (error: Error) => {
        logger.info(`Uncaught Exception: ${error.message}`);
    });

    process.on("SIGTERM", () => {
        logger.info(`Process ${process.pid} received SIGTERM: Exiting with code 0...`);
        handleGracefulExit(httpTerminator, server, 0);
    });

    process.on("SIGINT", () => {
        logger.info(`Process ${process.pid} received SIGINT: Exiting with code 0...`);
        handleGracefulExit(httpTerminator, server, 0);
    });
};

export { declareProcessListeners };
