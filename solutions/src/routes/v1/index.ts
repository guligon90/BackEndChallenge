import { Router } from "express";

import { swaggerUIRouter } from "./docs";

const router = Router({ mergeParams: true });

router.use("/v1", swaggerUIRouter);

export { router as apiV1Router };
