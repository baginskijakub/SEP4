import express from 'express'
import prisma from '../helperFunctions/setupPrisma'
import authorizeUser, { UserRequest } from '../middleware/authorizeUser'
import { ITask } from '@sep4/types'

const tasksRouter = express.Router()

tasksRouter.use(authorizeUser)

tasksRouter.delete('/:id', async (req: UserRequest, res) => {
  const { id } = req.params
  if (isNaN(Number(id))) return res.status(400).json({ message: 'Invalid task id', status: 'error' })

  try {
    const taskFromDb = await prisma.task.findUnique({
      where: {
        id: Number(id),
      },
    })
    if (!taskFromDb) return res.status(404).json({ message: 'Task with passed id not found', status: 'error' })

    const task: ITask = {
      id: taskFromDb.id,
      plantId: taskFromDb.plantId,
      type: taskFromDb.type as 'water' | 'fertilize' | 'repot',
      status: 'current',
      date: `to be completed today`,
    }
    if (taskFromDb.type === 'water') {
      await prisma.task.update({
        where: {
          id: Number(id),
        },
        data: {
          daysTillDeadline: taskFromDb.originalDeadline,
        },
      })
    } else {
      await prisma.task.delete({
        where: {
          id: Number(id),
        },
      })
    }
    return res.status(200).send(task)
  } catch (error) {
    return res.status(500).json({ message: 'Server error', status: 'error' })
  }
})

tasksRouter.get('/current', async (req: UserRequest, res) => {
  try {
    const decodedToken = req.user

    const tasksFromDb = await prisma.task.findMany({
      where: {
        plant: {
          email: decodedToken.email as string,
        },
        daysTillDeadline: {
          equals: 0,
        },
      },
    })

    const tasks: ITask[] = tasksFromDb.map((task) => {
      return {
        id: task.id,
        plantId: task.plantId,
        type: task.type as 'water' | 'fertilize' | 'repot',
        status: 'current',
        date: `to be completed today`,
      }
    })

    return res.status(200).json(tasks)
  } catch (error) {
    return res.status(500).json({ message: 'Server error', status: 'error' })
  }
})

export default tasksRouter
