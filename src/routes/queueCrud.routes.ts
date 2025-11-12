import { Router } from "express";
import { queueControllerCrud } from "../controllers/queueCrud.controller";

const router = Router();

router.get("/", queueControllerCrud.getQueues);
router.post("/", queueControllerCrud.createQueue);
router.put("/:id", queueControllerCrud.updateQueue);
router.delete("/:id", queueControllerCrud.deleteQueue);

export default router;
