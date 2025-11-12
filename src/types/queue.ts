
export type queue = {
    name: string;
    scheduled_date?: Date | string;
    start_time?: Date | string;
}

export type CreateQueue = queue & {
    business_id: number;
    branch_id: number;
    user_id: number;
}

export type AddCustomerToQueue = {
    queue_id: number;
    customer_id: number;
}

export type CreateQueueUser = {
    queue_id: number;
    customer_id: number;
    position : number;
    ticket_number: string;
    late_at?: Date | string;
}
    