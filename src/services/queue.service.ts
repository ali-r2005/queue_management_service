import  { MyUserPayload } from "@/types/jwt";
import { queueRepository } from "../repositories/queue.repository";
import { CreateQueue, queue } from "@/types/queue";

export const queueService = {
    getQueues : async (user: MyUserPayload | undefined) => {
        if (!user) {
            throw new Error("User not found");
        }
        if (user.role === "business_owner") {
            const queues = await queueRepository.getQueuesByCondition({
                where: {
                    business_id: user.business_id
                }
            });
            return queues;
        }
        if (user.role === "branch_manager") {
            const queues = await queueRepository.getQueuesByCondition({
                where: {
                    branch_id: user.branch_id
                }
            });
            return queues;
        }
        if (user.role === "staff") {
            const queues = await queueRepository.getQueuesByCondition({
                where: {
                    user_id: user.id
                }
            });
            return queues;
        }
    },

    createQueue : async (queue: queue, user: MyUserPayload | undefined) => {
        if (!user) {
            throw new Error("User not found");
        }
        const payload: CreateQueue = {
            ...queue,
            business_id: user.business_id,
            branch_id: user.branch_id,
            user_id: user.id
        }
        const newQueue = await queueRepository.createQueue(payload);
        return newQueue;
    },
    
    updateQueue : async (queueId: number, queue: queue) => {
        const updatedQueue = await queueRepository.updateQueue( queueId, queue);
        return updatedQueue;
    },
    
    deleteQueue : async (queueId: number) => {
        const deletedQueue = await queueRepository.deleteQueue(queueId);
        return deletedQueue;
    },
    
}
