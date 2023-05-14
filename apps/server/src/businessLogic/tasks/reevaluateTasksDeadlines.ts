import prisma from '../../helperFunctions/setupPrisma'

export async function reevaluateTasksDeadlines() {
  try {
    const tasks = await prisma.task.findMany()

    await Promise.allSettled(
      tasks.map(async (task) => {
        task.daysTillDeadline = task.daysTillDeadline - 1
        await prisma.task.update({
          where: {
            id: task.id,
          },
          data: {
            daysTillDeadline: task.daysTillDeadline,
          },
        })
      }),
    )
  } catch (error) {
    console.log(error.message)
  }
}
