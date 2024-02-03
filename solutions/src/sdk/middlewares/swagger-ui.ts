import * as OpenApiValidator from "express-openapi-validator";

import { OpenApiRequestHandler, OpenAPIV3 } from "express-openapi-validator/dist/framework/types";

const swaggerUiMiddleware = (apiSpec: OpenAPIV3.Document | string): OpenApiRequestHandler[] =>
    OpenApiValidator.middleware({
        apiSpec,
        validateRequests: true,
        validateResponses: true,
    });

export { swaggerUiMiddleware };
