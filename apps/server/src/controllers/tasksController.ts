import express from 'express'
import prisma from '../helperFunctions/setupPrisma'
import authorizeUser, { UserRequest } from '../middleware/authorizeUser'
import { ITask } from '@sep4/types'

const tasksController = express.Router()

tasksController.use(authorizeUser)

tasksController.delete('/:id', async (req: UserRequest, res) => {
  const { id } = req.params
  if (isNaN(Number(id))) return res.status(400).json({ message: 'Invalid id', status: 'error' })

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

export default tasksController
