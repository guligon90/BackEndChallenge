import nodeConfig from "config";

import { IServerConfig } from "./server";

interface IAppConfig {
    server: IServerConfig;
}

const config: IAppConfig = {
    server: nodeConfig.get<IServerConfig>("server"),
};

export default config;
export { IAppConfig };
