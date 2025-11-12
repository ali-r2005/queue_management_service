import { Request, Response } from "express";
import { queueServiceCrud } from "../services/queue.service";
import { queue } from "../types/queue";

export const queueControllerCrud = {
    getQueues : async (req: Request, res: Response) => {
        try {
            const queues = await queueServiceCrud.getQueues(req.user);
            res.status(200).json(queues);
        } catch (error: any) {
            const errorMessage = error instanceof Error ? error.message : "Failed to fetch queues";
            console.error(errorMessage);
            res.status(500).json({ error: errorMessage });
        }
    },

    createQueue : async (req: Request, res: Response) => {
        try {
            const queue: queue = req.body;
            const newQueue = await queueServiceCrud.createQueue(queue, req.user);
            res.status(201).json(newQueue);
        } catch (error: any) {
            const errorMessage = error instanceof Error ? error.message : "Failed to create queue";
            console.error(errorMessage);
            res.status(500).json({ error: errorMessage });
        }
    },

    updateQueue : async (req: Request, res: Response) => {
        try {
            const queueId = Number(req.params.id);
            const queue: queue = req.body;
            await queueServiceCrud.updateQueue(queueId, queue);
            res.status(200).json({ message: "Queue updated successfully" });
        } catch (error: any) {
            const errorMessage = error instanceof Error ? error.message : "Failed to update queue";
            console.error(errorMessage);
            res.status(500).json({ error: errorMessage });
        }
    },

    deleteQueue : async (req: Request, res: Response) => {
        try {
            const queueId = Number(req.params.id);
            await queueServiceCrud.deleteQueue(queueId);
            res.status(200).json({ message: "Queue deleted successfully" });
        } catch (error: any) {
            const errorMessage = error instanceof Error ? error.message : "Failed to delete queue";
            console.error(errorMessage);
            res.status(500).json({ error: errorMessage });
        }
    },

}
