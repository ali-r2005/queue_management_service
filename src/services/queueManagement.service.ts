import { AddCustomerToQueue } from "../types/queue";
import { queueRepository } from "../repositories/queue.repository";
import crypto from "crypto";
import adjustPositions from "../utils/adjustPositions";

export const queueManagementService = {
    addCustomerToQueue: async (customer: AddCustomerToQueue) => {
        const queue = await queueRepository.getFirstQueueUserByCondition({ where: { queue_id: customer.queue_id }, orderBy: { position: "desc" } });
        console.log("queue",queue);
        let position;
        if (!queue) {
            position = 1;
        }
        else {
            position = queue.position + 1;
        }
        const ticketNumber = `T-${crypto.randomBytes(3).toString('hex').substring(0, 4).toUpperCase()}`;
        const queueUser = await queueRepository.createQueueUser({
            queue_id: customer.queue_id,
            customer_id: customer.customer_id,
            position: position,
            ticket_number: ticketNumber,
        });
        await adjustPositions(customer.queue_id);
        //notify the customer
        return queueUser;
    },

    getCustomersQueue: async (queue_id: number) => {
        if (!queue_id) {
            console.log("Queue id is required");
            throw new Error("Queue id is required");
        }
        const queue = await queueRepository.getCustomersQueue(queue_id);
        return queue;
    },

    removeCustomerFromQueue: async (id: number) => {
        if (!id) {
            throw new Error("Queue id is required");
        }
        await queueRepository.removeCustomerFromQueue(id);
    },

    moveCustomerToPosition: async (id: number, newPosition: number) => {
        if (!id) {
            throw new Error("Queue user id is required");
        }
        if (!newPosition || newPosition < 1) {
            throw new Error("Invalid new position");
        }
        const updated = await queueRepository.moveCustomerToPosition(id, newPosition);
        return updated;
    },

    markCustomerAsLate: async (id: number) => {
        if (!id) {
            throw new Error("Queue user id is required");
        }
        const updated = await queueRepository.markCustomerAsLate(id);
        return updated;
    },

    
}