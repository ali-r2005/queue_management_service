import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Example data for business owner, branch manager, staff
  const businessOwnerId = 1;
  const branchManagerId = 2;
  const staffId = 3;
  const branchId = 10;
  const businessId = 100;

  // Create Queues
  const queue1 = await prisma.queue.create({
    data: {
      branch_id: branchId,
      business_id: businessId,
      user_id: businessOwnerId,
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
      user_id: branchManagerId,
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
        user_id: staffId,
        position: 1,
        status: "waiting",
        ticket_number: "T001",
      },
      {
        queue_id: queue2.id,
        user_id: staffId,
        position: 1,
        status: "serving",
        ticket_number: "T002",
      },
    ],
  });

  // Example served customer
  await prisma.servedCustomer.create({
    data: {
      queue_id: queue1.id,
      user_id: staffId,
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
      user_id: staffId,
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
