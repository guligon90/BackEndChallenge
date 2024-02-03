import { Server } from "http";
import { HttpTerminator } from "http-terminator";
import { Logger } from "../logging";

const logger = Logger(`solutions@${__filename}`);

const handleGracefulExit = async (
    httpTerminator: HttpTerminator,
    server: Server,
    code: number,
    timeout = 5000,
): Promise<void> => {
    try {
        logger.info(`Attempting a graceful shutdown with code ${code}`);

        setTimeout(() => {
            logger.info(`Forcing a shutdown with code ${code}`);
            process.exit(code);
        }, timeout).unref();

        if (server.listening) {
            logger.info("Terminating HTTP connections...");
            await httpTerminator.terminate();
        }

        logger.info(`Exiting gracefully with code ${code}...`);

        process.exit(code);
    } catch (error) {
        logger.info("Error while attempting to shut down gracefully");
        logger.info(error);
        logger.info(`Forcing exit with code ${code}...`);

        process.exit(code);
    }
};

export { handleGracefulExit };
