import { Router } from "express";
import * as swaggerUi from "swagger-ui-express";

import { apiSpec } from "@api/specs";

const router = Router();

router.use("/docs", swaggerUi.serve);
router.get("/docs", swaggerUi.setup(apiSpec));

export { router as swaggerUIRouter };
