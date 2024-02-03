"use strict";

import registerModuleAliases from "./modules";
import config from "./app/config";

registerModuleAliases(config);

import { applicationFactory } from "./app";
import { Logger } from "./sdk/logging";
import { serverFactory, startServer } from "./server";

const logger = Logger(`solutions@${__filename}`);

(() => {
    const app = applicationFactory();
    const server = serverFactory(app);

    startServer(app, server, config, logger);
})();
