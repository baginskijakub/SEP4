import express from 'express'
import prisma from '../helperFunctions/setupPrisma'
import authorizeUser, { UserRequest } from '../middleware/authorizeUser'
import { mapToDatabaseTaskFormat } from '../businessLogic/tasks/mapToDatabaseTaskFormat'
import { isValidTask } from '../businessLogic/tasks/isValidTask'

const taskRouter = express.Router()

taskRouter.use(authorizeUser)

taskRouter.post('/', async (req: UserRequest, res) => {
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
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task', status: 'error' })
  }
})

export default taskRouter
