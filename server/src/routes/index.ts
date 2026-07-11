import { Router } from "express";
import { healthCheck } from "../controllers/MemoryController";

const router = Router();

router.get("/", healthCheck);

export default router;