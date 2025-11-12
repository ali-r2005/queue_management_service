import { PrismaClient } from "@/generated/prisma/client";
import { MyUserPayload } from "@/types/jwt";

const prisma = new PrismaClient();

// Example data for business owner, branch manager, staff
  const businessOwnerId = 1;
  const branchManagerId = 2;
  const staffId = 3;
  const branchId = 10;
  const businessId = 100;

export const userStaff: MyUserPayload = {
  id: staffId,
  username: "ali",
  email: "ali@gmail.com",
  role: "staff",
  business_id: businessId,
  branch_id: branchId
}

async function main() {
  console.log("🌱 Seeding database...");


  // Create Queues
  const queue1 = await prisma.queue.create({
    data: {
      branch_id: branchId,
      business_id: businessId,
      user_id: userStaff.id,
      name: "Morning Queue",
      scheduled_date: new Date(),
      is_active: true,
      start_time: new Date(),
    },
  });

  const queue2 = await prisma.queue.create({
    data: {
      branch_id: branchId,
      business_id: businessId,
      user_id: userStaff.id,
      name: "Afternoon Queue",
      scheduled_date: new Date(),
      is_active: true,
      start_time: new Date(),
    },
  });

  // Add users to the queues
  await prisma.queueUser.createMany({
    data: [
      {
        queue_id: queue1.id,
        user_id: 4,
        position: 1,
        status: "waiting",
        ticket_number: "T001",
      },
      {
        queue_id: queue2.id,
        user_id: 9,
        position: 1,
        status: "waiting",
        ticket_number: "T002",
      },
    ],
  });

  // Example served customer
  await prisma.servedCustomer.create({
    data: {
      queue_id: queue1.id,
      user_id: 5,
      waiting_time: 120, // seconds
    },
  });

  // Example latecomer queue + user
  const lateQueue = await prisma.latecomerQueue.create({
    data: {
      queue_id: queue2.id,
    },
  });

  await prisma.latecomerQueueUser.create({
    data: {
      latecomerQueue_id: lateQueue.id,
      user_id: 67,
    },
  });

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
