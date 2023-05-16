import express from 'express';
import prisma from '../helperFunctions/setupPrisma';
import authorizeUser, { UserRequest } from '../middleware/authorizeUser';
import { ITask } from '@sep4/types';
import { isValidPlant } from '../businessLogic/plants/isValidPlant';

const taskRouter = express.Router();

taskRouter.use(authorizeUser);

taskRouter.post('/', async (req: UserRequest, res) => {
  const { plantId, type, status, date } = req.body;

  try {
    const decodedToken = req.user;
    const existingUser = await prisma.user.findUnique({
      where: { email: decodedToken.email as string },
    });

    if (!existingUser) {
      res.status(400).json({ message: 'User does not exist', status: 'error' });
      return;
    }

    const existingPlant = await prisma.plant.findUnique({
      where: { id: parseInt(plantId) },
    });

    if (!existingPlant) {
      res.status(400).json({ message: 'Plant does not exist', status: 'error' });
      return;
    }

    const task = await prisma.task.create({
      data: {
        plantId: parseInt(plantId),
        type,
        daysTillDeadline: 5,
        originalDeadline: 5
      },
    });

    res.status(201).json({ message: 'Task successfully created', task, status: 'success' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create task', status: 'error' });
  }
});

export default taskRouter;
