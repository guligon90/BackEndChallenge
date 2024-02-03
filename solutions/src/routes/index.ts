import { Router } from "express";

import { apiV1Router } from "./v1";

const router = Router({ mergeParams: true });

router.use("/api", apiV1Router);

export { router as apiRouter };
