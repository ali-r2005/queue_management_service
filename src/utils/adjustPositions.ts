import prisma from "@/config/prismaClient";

export default async function adjustPositions(queueId: number): Promise<void> {
    const users = await prisma.queueUser.findMany({
        where: { queue_id: queueId },
        orderBy: [{ position: "asc" }],
    });

    const updates = [] as ReturnType<typeof prisma.queueUser.update>[];
    for (let i = 0; i < users.length; i++) {
        const expected = i + 1;
        if (users[i].position !== expected) {
            updates.push(
                prisma.queueUser.update({
                    where: { id: users[i].id },
                    data: { position: expected },
                })
            );
        }
    }

    if (updates.length) {
        await prisma.$transaction(updates);
    }
}