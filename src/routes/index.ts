import { Router } from "express";
import indexRoutes from "./index.routes.ts";
import authRoutes from "./auth.routes.ts";

const router = Router();

router.use("/", authRoutes);
router.use("/", indexRoutes);

export default router;
