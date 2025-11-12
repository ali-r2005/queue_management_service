
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

    