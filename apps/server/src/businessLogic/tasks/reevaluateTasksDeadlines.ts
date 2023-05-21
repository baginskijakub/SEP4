import { PrismaClient } from '@prisma/client'

export async function reevaluateTasksDeadlines() {
  try {
    const prisma = new PrismaClient()
    const tasks = await prisma.task.findMany()

    await Promise.allSettled(
      tasks.map(async (task) => {
        task.daysTillDeadline = task.daysTillDeadline - 1
        prisma.task.update({
          where: {
            id: task.id,
          },
          data: {
            daysTillDeadline: task.daysTillDeadline,
          },
        })
      }),
    )
    await prisma.$disconnect()
  } catch (error) {
    console.log(error.message)
  }
}
