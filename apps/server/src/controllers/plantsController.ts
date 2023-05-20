import express from 'express'
import prisma from '../helperFunctions/setupPrisma'
import environmentRouter from './environmentController'
import { UserRequest } from '../middleware/authorizeUser'
import authorizeUser from '../middleware/authorizeUser'
import { IPlant } from '@sep4/types'
import { isValidPlant } from '../businessLogic/plants/isValidPlant'

const plantsRouter = express.Router()

plantsRouter.use('/:plantId/environment', environmentRouter)
plantsRouter.use(authorizeUser)

plantsRouter.post('/', async (req: UserRequest, res) => {
  const requestPlant: unknown = req.body

  try {
    const decodedToken = req.user
    if (!isValidPlant(requestPlant) || requestPlant === null) {
      res.status(400).json({ message: 'Missing parameters to register a plant', status: 'error' })
      return
    }

    const existingUser = await prisma.user.findUnique({ where: { email: decodedToken.email as string } })
    if (!existingUser) {
      res.status(400).json({ message: 'User does not exist', status: 'error' })
      return
    }

    const plant = await prisma.plant.create({
      data: {
        name: requestPlant.name,
        nickName: requestPlant.nickName,
        image: requestPlant.image,
        latinName: requestPlant.latinName,
        email: decodedToken.email,
        minCo2: requestPlant?.idealEnvironment.minCo2,
        maxCo2: requestPlant?.idealEnvironment.maxCo2,
        minHumidity: requestPlant?.idealEnvironment.minHumidity,
        maxHumidity: requestPlant?.idealEnvironment.maxHumidity,
        maxTemperature: requestPlant?.idealEnvironment.maxTemperature,
        minTemperature: requestPlant?.idealEnvironment.minTemperature,
      },
    })

    if (requestPlant.wateringInterval) {
      await prisma.task.createMany({
        data: [
          {
            plantId: plant.id,
            type: 'water',
            daysTillDeadline: requestPlant.wateringInterval,
            originalDeadline: requestPlant.wateringInterval,
          },
          {
            plantId: plant.id,
            type: 'water',
            daysTillDeadline: requestPlant.wateringInterval * 2,
            originalDeadline: requestPlant.wateringInterval,
          },
          {
            plantId: plant.id,
            type: 'water',
            daysTillDeadline: requestPlant.wateringInterval * 3,
            originalDeadline: requestPlant.wateringInterval,
          },
          {
            plantId: plant.id,
            type: 'water',
            daysTillDeadline: requestPlant.wateringInterval * 4,
            originalDeadline: requestPlant.wateringInterval,
          },
        ],
      })
    }
    res.status(201).json({ message: 'Plant successfully registered', plant, status: 'success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed to register plant', status: 'error' })
  }
})

plantsRouter.patch('/:plantId/watering', async (req: UserRequest, res) => {
  const { plantId } = req.params
  const { wateringInterval } = req.body
  if (!wateringInterval || typeof wateringInterval !== 'number') {
    res.status(400).json({ message: 'Missing watering interval', status: 'error' })
    return
  }
  if (wateringInterval < 0) {
    res.status(400).json({ message: 'Watering interval must be a positive number', status: 'error' })
    return
  }
  if (isNaN(parseInt(plantId))) {
    res.status(400).json({ message: 'Invalid plant id', status: 'error' })
    return
  }
  try {
    const tasks = await prisma.task.findMany({ where: { plantId: parseInt(plantId), type: 'water' } })
    let multiplier = 0
    let daysLeftTillFirstDeadline
    for (const task of tasks) {
      if (multiplier === 0) {
        daysLeftTillFirstDeadline = task.daysTillDeadline
        continue
      }

      multiplier++
      await prisma.task.update({
        where: { id: task.id },
        data: {
          daysTillDeadline: daysLeftTillFirstDeadline + wateringInterval * multiplier,
          originalDeadline: wateringInterval,
        },
      })
    }
    return res.status(200).send({ message: 'Watering interval updated', status: 'success' })
  } catch (error) {
    return res.status(502).send({ message: 'Server error', status: 'error' })
  }
})

// GET all plants assigned to the usrer
plantsRouter.get('/', async (req: UserRequest, res) => {
  try {
    const decodedToken = req.user
    const plantsFromDb = await prisma.plant.findMany({ where: { email: decodedToken.email as string } })

    const plants: IPlant[] = plantsFromDb.map((plant) => {
      return {
        id: plant.id,
        name: plant.name,
        nickName: plant.nickName,
        image: plant.image,
        latinName: plant.latinName,
      }
    })

    res.status(200).json(plants)
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch plants', status: 'error' })
  }
})

//GET the plant after id
plantsRouter.get('/:plantId', async (req: UserRequest, res) => {
  const { plantId } = req.params

  try {
    const plantFromDb = await prisma.plant.findUnique({
      where: { id: parseInt(plantId) },
    })

    if (!plantFromDb) {
      return res.status(404).json({ message: 'Plant was not found', status: 'error' })
    }

    const currentEnvironmentFromDb = await prisma.currentEnvironment.findUnique({
      where: { plantId: parseInt(plantId) },
    })
    const plant: IPlant = {
      id: plantFromDb.id,
      name: plantFromDb.name,
      nickName: plantFromDb.nickName,
      image: plantFromDb.image,
      latinName: plantFromDb.latinName,
      idealEnvironment: {
        minCo2: plantFromDb.minCo2,
        maxCo2: plantFromDb.maxCo2,
        minHumidity: plantFromDb.minHumidity,
        maxHumidity: plantFromDb.maxHumidity,
        minTemperature: plantFromDb.minTemperature,
        maxTemperature: plantFromDb.maxTemperature,
      },
    }

    if (currentEnvironmentFromDb) {
      plant.currentEnvironment = {
        co2: currentEnvironmentFromDb.co2,
        humidity: currentEnvironmentFromDb.humidity,
        temperature: currentEnvironmentFromDb.temperature,
      }
    }

    res.status(200).json(plant)
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch plant', status: 'error' })
  }
})

// //PATCH
plantsRouter.patch('/:plantId', async (req, res) => {
  const { plantId } = req.params
  const requestPlant: unknown = req.body
  try {
    if (!isValidPlant(requestPlant) || requestPlant === null) {
      res.status(400).json({ message: 'Missing parameters to register a plant', status: 'error' })
      return
    }
    await prisma.plant.update({
      where: { id: parseInt(plantId) },
      data: {
        name: requestPlant.name,
        nickName: requestPlant.nickName,
        image: requestPlant.image,
        latinName: requestPlant.latinName,
        minCo2: requestPlant?.idealEnvironment.minCo2,
        maxCo2: requestPlant?.idealEnvironment.maxCo2,
        minHumidity: requestPlant?.idealEnvironment.minHumidity,
        maxHumidity: requestPlant?.idealEnvironment.maxHumidity,
        maxTemperature: requestPlant?.idealEnvironment.maxTemperature,
        minTemperature: requestPlant?.idealEnvironment.minTemperature,
      },
    })
    res.status(200).json({ message: 'Plant updated successfully', status: 'success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed to update plant', status: 'error' })
  }
})

//REMOVE
plantsRouter.delete('/:plantId', async (req: UserRequest, res) => {
  const { plantId } = req.params
  try {
    await prisma.plant.delete({ where: { id: parseInt(plantId) } })
    res.status(200).json({ message: 'Plant deleted successfully', status: 'success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete plant', status: 'error' })
  }
})

export default plantsRouter
