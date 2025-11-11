import { Request, Response } from "express";
import { queueService } from "../services/queue.service";

export const queueController = {
    getQueues : async (req: Request, res: Response) => {
        try {
            const queues = await queueService.getQueues(req.user);
            res.status(200).json(queues);
        } catch (error: any) {
            const errorMessage = error instanceof Error ? error.message : "Failed to fetch queues";
            console.error(errorMessage);
            res.status(500).json({ error: errorMessage });
        }
    },
}
