import * as path from "path";
import moduleAlias from "module-alias";

import { IAppConfig } from "./app/config";
import tsConfig from "../tsconfig.json";

const registerModuleAliases = (appConfig: IAppConfig): void => {
    const {
        server: { environment },
    } = appConfig;

    const { outDir, paths } = tsConfig.compilerOptions;

    const basePath = path.join(__dirname, "..");
    const isDev = environment === "development";
    const isTest = environment === "test";

    const buildPath = (module: string, external = false): string => {
        // Make the switch between production and development targets
        const isProd = !(isDev || isTest);
        const baseFolder = isProd ? outDir : "src";
        // e.g. in dev mode, the test module is outside src/
        const pathToJoin = external ? (isProd ? baseFolder : module) : `${baseFolder}/${module}`;

        return path.join(basePath, pathToJoin);
    };

    const mappedPaths: { [alias: string]: string } = {};

    for (const path of Object.keys(paths)) {
        const external = ["@src/*", "@test/*"].includes(path);

        mappedPaths[path.replace("/*", "")] = buildPath(path.replace("@", "").replace("/*", ""), external);
    }

    moduleAlias.addAliases(mappedPaths);
};

export default registerModuleAliases;
