import { Router } from "express";
import { queueController } from "../controllers/queue.controller";

const router = Router();

router.get("/", queueController.getQueues);

export default router;
