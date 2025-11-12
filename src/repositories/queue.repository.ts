import prisma from "@/config/prismaClient";
import { CreateQueue, queue, CreateQueueUser } from "@/types/queue";

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

    getFirstQueueUserByCondition : async (condition: any) => {
        const queueUser = await prisma.queueUser.findFirst(condition);
        return queueUser;
    },

    createQueueUser : async (queueUser: CreateQueueUser) => {
        const newQueueUser = await prisma.queueUser.create({ data: queueUser });
        return newQueueUser;
    },

    getCustomersQueue : async (queue_id: number) => {
        const queueUser = await prisma.queueUser.findMany({ where: { queue_id: queue_id } });
        return queueUser;
    },

    removeCustomerFromQueue : async (id: number) => {
        const removedCustomer = await prisma.queueUser.delete({ where: { id: id } });
        return removedCustomer;
    },

    moveCustomerToPosition: async (id: number, newPosition: number) => {
        const user = await prisma.queueUser.findUnique({ where: { id } });
        if (!user) {
            throw new Error("Queue user not found");
        }
        const queueId = user.queue_id;
        const total = await prisma.queueUser.count({ where: { queue_id: queueId } });

        if (newPosition < 1) newPosition = 1;
        if (newPosition > total) newPosition = total;

        if (newPosition === user.position) {
            return user;
        }

        const ops = [] as any[];
        if (newPosition < user.position) {
            ops.push(
                prisma.queueUser.updateMany({
                    where: { queue_id: queueId, position: { gte: newPosition, lt: user.position } },
                    data: { position: { increment: 1 } },
                })
            );
        } else {
            ops.push(
                prisma.queueUser.updateMany({
                    where: { queue_id: queueId, position: { lte: newPosition, gt: user.position } },
                    data: { position: { decrement: 1 } },
                })
            );
        }

        ops.push(
            prisma.queueUser.update({ where: { id }, data: { position: newPosition } })
        );

        const results = await prisma.$transaction(ops);
        const updated = results[results.length - 1];
        return updated;
    }


}