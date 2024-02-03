import config from "@src/app/config";

import { ApiSpecFactory } from "./factory";

const {
    server: { environment, port },
} = config;

const factory = ApiSpecFactory()
    .applyBasicInfo("Proftsale Backend Challenge")
    .applyServers([
        {
            url: `http://localhost:${port}/api/v1`,
            description: `Environment: ${environment}`,
        },
    ])
    .applyTags([])
    .applyPaths({});

const apiSpec = factory.document();

export { apiSpec };
