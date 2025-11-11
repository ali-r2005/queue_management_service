import prisma from "@/config/prismaClient";

export const queueRepository = {  
    getQueuesByCondition : async (condition: any) => {
        const queues = await prisma.queue.findMany(condition);
        return queues;
    }

}