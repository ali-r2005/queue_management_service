import { Router } from "express";
import { queueController } from "../controllers/queue.controller";

const router = Router();

router.get("/", queueController.getQueues);
router.post("/", queueController.createQueue);
router.put("/:id", queueController.updateQueue);
router.delete("/:id", queueController.deleteQueue);

export default router;
