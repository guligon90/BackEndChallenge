import { Request, Response, NextFunction } from "express";
import path from "path";

import { Logger } from "../logging";

const fileName = path.basename(__filename, path.extname(__filename));
const logger = Logger(`solutions@${fileName}`);

const getActualRequestDurationInMilliseconds = (start: [number, number] | undefined): number => {
    const NS_PER_SEC = 1e9; // convert to nanoseconds
    const NS_TO_MS = 1e6; // convert to milliseconds
    const diff = process.hrtime(start);

    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

const getFormatteDateTime = (currentDateTime: Date): string => {
    const _format = (value: number): string => (value < 10 ? `0${value}` : String(value));

    return (
        currentDateTime.getFullYear() +
        "-" +
        _format(currentDateTime.getMonth() + 1) +
        "-" +
        _format(currentDateTime.getDate()) +
        " " +
        _format(currentDateTime.getHours()) +
        ":" +
        _format(currentDateTime.getMinutes()) +
        ":" +
        _format(currentDateTime.getSeconds())
    );
};

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const formattedDate = getFormatteDateTime(new Date());
    const { method, url } = req;
    const { statusCode } = res;
    const start = process.hrtime();
    const durationInMilliseconds = getActualRequestDurationInMilliseconds(start);

    // Including datetime here in order to compare it
    // with the datetime produced by the winston logger
    const log = `[${formattedDate}] ${method}:${url} ${statusCode} ${durationInMilliseconds.toLocaleString()} ms`;

    logger.info(log);

    next();
};
