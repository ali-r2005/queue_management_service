import prisma from "@/config/prismaClient";
import { CreateQueue, queue } from "@/types/queue";

export const queueRepository = {  
    getQueuesByCondition : async (condition: any) => {
        const queues = await prisma.queue.findMany(condition);
        return queues;
    },

    createQueue : async (queue: CreateQueue) => {
        const newQueue = await prisma.queue.create({ data: queue });
        return newQueue;
    },

    updateQueue : async (queueId: number, queue: queue) => {
        const updatedQueue = await prisma.queue.update({
            where: {
                id: queueId
            },
            data: queue
        });
        return updatedQueue;
    },

    deleteQueue : async (queueId: number) => {
        const deletedQueue = await prisma.queue.delete({
            where: {
                id: queueId
            }
        });
        return deletedQueue;
    },

}