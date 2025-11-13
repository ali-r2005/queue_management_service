import { AddCustomerToQueue } from "../types/queue";
import { queueRepository } from "../repositories/queue.repository";
import crypto from "crypto";
import adjustPositions from "../utils/adjustPositions";

export const queueManagementService = {
    addCustomerToQueue: async (customer: AddCustomerToQueue) => {
        const queue = await queueRepository.getFirstQueueUserByCondition({ where: { queue_id: customer.queue_id, position: { not: null } }, orderBy: { position: "desc" } });
        console.log("queue",queue);
        let position;
        if (!queue) {
            position = 1;
        }
        else {
            const queuePosition = queue.position as number;
            position = queuePosition + 1;
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
        const updated = await queueRepository.updateQueueCustomer({ where: { id }, data: { status: "late", late_at: new Date() } });
        await adjustPositions(updated.queue_id);
        return updated;
    },

    getLateCustomers: async (id: number) => {
        const lateCustomers = await queueRepository.getLateCustomers(id);
        return lateCustomers;
    },

    reinstateCustomer: async (id: number, position: number) => {
        if (!id) {
            throw new Error("Queue user id is required");
        }
        await queueRepository.updateQueueCustomer({ where: { id }, data: { status: "waiting" } });
        queueRepository.moveCustomerToPosition(id, position);
    },

    serveCustomer: async (id: number) => {
        if (!id) {
            throw new Error("Queue user id is required");
        }
        await queueRepository.updateQueueCustomer({ where: { id }, data: { status: "serving", served_at: new Date() } });
    },

    servedCustomer: async (id: number) => {
        if (!id) {
            throw new Error("Queue user id is required");
        }
        const customer = await queueRepository.deleteCustomerFromQueue(id);

        if (!customer.served_at) {
            throw new Error("Customer has not been served yet. 'served_at' is missing.");
        }
       
        await adjustPositions(customer.queue_id);

        const servedAtTime = new Date(customer.served_at).getTime();
        const now = Date.now();
        const timeServedInSeconds = Math.round((now - servedAtTime) / 1000);

        await queueRepository.createServedCustomer({
            queue_id: customer.queue_id,
            customer_id: customer.customer_id,
            waiting_time: timeServedInSeconds
        });
    },

    
}