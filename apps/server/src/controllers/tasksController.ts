import express from 'express'
import prisma from '../helperFunctions/setupPrisma'
import authorizeUser, { UserRequest } from '../middleware/authorizeUser'
import { ITask } from '@sep4/types'
import { mapToDatabaseTaskFormat } from '../businessLogic/tasks/mapToDatabaseTaskFormat'
import { isValidTask } from '../businessLogic/tasks/isValidTask'

const tasksRouter = express.Router()

tasksRouter.use(authorizeUser)

tasksRouter.post('/', async (req: UserRequest, res) => {
  const taskToConvert = req.body

  if (!isValidTask(taskToConvert)) {
    res.status(400).json({ message: 'Invalid task data', status: 'error' })
    return
  }

  try {
    const existingPlant = await prisma.plant.findUnique({
      where: { id: taskToConvert.plantId },
    })

    if (!existingPlant) {
      res.status(404).json({ message: 'Plant does not exist', status: 'error' })
      return
    }

    const taskToSave = mapToDatabaseTaskFormat(taskToConvert)

    if (!taskToSave) {
      res.status(400).json({ message: 'Invalid task data', status: 'error' })
      return
    }

    const task = await prisma.task.create({
      data: taskToSave,
    })

    res.status(201).json({
      ...taskToConvert,
      id: task.id,
      date: `${task.daysTillDeadline} day${task.daysTillDeadline > 1 ? 's' : ''} until deadline`,
    })
    await prisma.$disconnect()
    return
  } catch (error) {
    return res.status(502).json({ message: 'Failed to create task', status: 'error' })
  }
})

tasksRouter.get('/', async (req: UserRequest, res) => {
  try {
    const tasksFromDb = await prisma.task.findMany({
      where: {
        plant: {
          email: req.user.email,
        },
      },
    })
    const tasks: ITask[] = tasksFromDb.map((task) => {
      let status
      let date
      if (task.daysTillDeadline == 0) {
        status = 'current'
        date = 'to be completed today'
      } else if (task.daysTillDeadline > 0) {
        status = 'future'
        date = `${task.daysTillDeadline} day${task.daysTillDeadline == 1 ? '' : 's'} until deadline`
      } else {
        status = 'past'
        date = `${Math.abs(task.daysTillDeadline)} day${task.daysTillDeadline == -1 ? '' : 's'} after deadline`
      }
      return {
        id: task.id,
        plantId: task.plantId,
        type: task.type as 'water' | 'fertilize' | 'repot',
        status,
        date,
      }
    })
    await prisma.$disconnect()

    return res.status(200).send(tasks)
  } catch (error) {
    return res.status(500).json({ message: 'Server error', status: 'error' })
  }
})

tasksRouter.get('/epoch', async (req: UserRequest, res) => {
  try {
    const tasksFromDb = await prisma.task.findMany({
      where: {
        plant: {
          email: req.user.email,
        },
      },
    })
    const tasks: ITask[] = tasksFromDb.map((task) => {
      let status
      let date
      if (task.daysTillDeadline == 0) {
        status = 'current'
        date = `${Math.round(new Date().getTime() / 1000)}`
      } else if (task.daysTillDeadline > 0) {
        status = 'future'
        date = `${Math.round(new Date().getTime() / 1000) + task.daysTillDeadline * 86400}`
      } else {
        status = 'past'
        date = `${Math.round(new Date().getTime() / 1000) + task.daysTillDeadline * 86400}`
      }
      return {
        id: task.id,
        plantId: task.plantId,
        type: task.type as 'water' | 'fertilize' | 'repot',
        status,
        date,
      }
    })
    await prisma.$disconnect()

    return res.status(200).send(tasks)
  } catch (error) {
    return res.status(500).json({ message: 'Server error', status: 'error' })
  }
})

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
      await prisma.task.delete({
        where: {
          id: Number(id),
        },
      })
      const nextWateringTask = await prisma.task.findFirst({
        where: {
          plantId: taskFromDb.plantId,
          type: 'water',
        },
        orderBy: {
          daysTillDeadline: 'asc',
        },
      })
      if (nextWateringTask) {
        await prisma.task.create({
          data: {
            plantId: taskFromDb.plantId,
            type: 'water',
            daysTillDeadline: nextWateringTask.daysTillDeadline * 4,
            originalDeadline: nextWateringTask.originalDeadline,
          },
        })
      }
    } else {
      await prisma.task.delete({
        where: {
          id: Number(id),
        },
      })
    }
    await prisma.$disconnect()

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
    await prisma.$disconnect()

    return res.status(200).json(tasks)
  } catch (error) {
    return res.status(500).json({ message: 'Server error', status: 'error' })
  }
})

export default tasksRouter
