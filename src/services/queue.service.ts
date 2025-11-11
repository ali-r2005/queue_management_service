import  { MyUserPayload } from "@/types/jwt";
import { queueRepository } from "../repositories/queue.repository";

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
    }
    
}
