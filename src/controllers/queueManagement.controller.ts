import { Request, Response } from "express";
import { queueManagementService } from "../services/queueManagement.service";
import { AddCustomerToQueue } from "../types/queue";

export const queueManagementController = {
    addCustomerToQueue: async (req: Request, res: Response) => {
        try {
            await queueManagementService.addCustomerToQueue(req.body);
            return res.status(200).json({ message: "Customer added to queue successfully" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    getCustomersQueue: async(req: Request, res: Response) => {
        try {
            const queue =  await queueManagementService.getCustomersQueue(req.body.queue_id);
            return res.status(200).json(queue);
        } catch (error) {
            console.log(error);
            const errorMessage = error instanceof Error ? error.message : "Internal server error";
            if (errorMessage === "Queue id is required") {
                return res.status(404).json({ message: "Queue id is required" });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    removeCustomerFromQueue: async (req: Request, res: Response) => {
        try {
            await queueManagementService.removeCustomerFromQueue(parseInt(req.params.id));
            return res.status(200).json({ message: "Customer removed from queue successfully" });
        } catch (error) {
            console.log(error);
            const errorMessage = error instanceof Error ? error.message : "Internal server error";
            if (errorMessage === "Queue id is required") {
                return res.status(404).json({ message: "Queue id is required" });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    moveCustomerToPosition: async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            const { new_position } = req.body as { new_position: number };
            const newPosition = parseInt(String(new_position));
            const updated = await queueManagementService.moveCustomerToPosition(id, newPosition);
            return res.status(200).json({ message: "Customer moved successfully", data: updated });
        } catch (error) {
            console.log(error);
            const errorMessage = error instanceof Error ? error.message : "Internal server error";
            if (errorMessage === "Queue user id is required" || errorMessage === "Invalid new position") {
                return res.status(400).json({ message: errorMessage });
            }
            if (errorMessage === "Queue user not found") {
                return res.status(404).json({ message: errorMessage });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    markCustomerAsLate: async (req: Request, res: Response) => {
        try {
            await queueManagementService.markCustomerAsLate(parseInt(req.params.id));
            return res.status(200).json({ message: "Customer marked as late successfully" });
        } catch (error) {
            console.log(error);
            const errorMessage = error instanceof Error ? error.message : "Internal server error";
            if (errorMessage === "Queue user id is required") {
                return res.status(404).json({ message: errorMessage });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    },


    
}
