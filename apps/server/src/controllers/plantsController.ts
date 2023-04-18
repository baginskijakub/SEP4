import express from 'express'
import prisma from '../helperFunctions/setupPrisma'
import { UserRequest } from '../middleware/authorizeUser'
import authorizeUser from '../middleware/authorizeUser'
import { IGraphData, IGraphPoint } from '@sep4/types'
import { isValidType } from '../businessLogic/plants/isValidGraphType'
import { formatDate } from '../businessLogic/plants/formatDate'
import { IPlant } from '@sep4/types'

const plantsRouter = express.Router()

plantsRouter.get('/:plantId/environment/:type', authorizeUser, async (req, res) => {
  try {
    const { plantId, type } = req.params

    if (!plantId || !type) {
      res.status(400).json({ message: 'Missing parameters', status: 'error' })
      return
    }

    if (!isValidType(type)) {
      res.status(400).json({ message: 'Wrong type', status: 'error' })
      return
    }

    const graphData = await prisma.graphData.findMany({
      where: {
        plantId: parseInt(plantId),
        type: type,
      },
      orderBy: {
        dateEpoch: 'asc',
      },
    })

    const graphPoints: IGraphPoint[] = graphData.map((data) => {
      return {
        date: formatDate(data.dateEpoch),
        value: data.value,
      }
    })

    const formattedGraphData: IGraphData = {
      type: type,
      data: graphPoints,
    }

    res.status(200).json(formattedGraphData)
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized', status: 'error' })
    return
  }
})

plantsRouter.post('/', authorizeUser, async (req: UserRequest, res) => {
  const { name, description, image, latinName } = req.body

  try {
    const decodedToken = req.user
    if (!name || !description || !image || !latinName) {
      res.status(400).json({ message: 'Missing parameters to register a plant', status: 'error' })
      return
    }

    const plant = await prisma.plant.create({
      data: {
        name,
        description,
        image,
        latinName,
        username: decodedToken.username,
      },
    })
    res.status(201).json({ message: 'Plant successfully registerd', plant, status: 'success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed to register plant', status: 'error' })
  }
})

// GET all plants assigned to the usrer
plantsRouter.get('/', authorizeUser, async (req: UserRequest, res) => {
  try {
    const decodedToken = req.user
    const plantsFromDb = await prisma.plant.findMany({ where: { username: decodedToken.username as string } })

    const plants: IPlant[] = plantsFromDb.map((plant) => {
      return {
        id: plant.id,
        name: plant.name,
        description: plant.description,
        image: plant.image,
        latinName: plant.latinName,
      }
    })

    res.status(200).json({ plants, status: 'success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch plants', status: 'error' })
  }
})

//GET the plant after id
plantsRouter.get('/:plantId', authorizeUser, async (req: UserRequest, res) => {
  const { plantId } = req.params

  try {
    const plantFromDb = await prisma.plant.findUnique({ where: { id: parseInt(plantId) } })
    const plant: IPlant = {
      id: plantFromDb.id,
      name: plantFromDb.name,
      description: plantFromDb.description,
      image: plantFromDb.image,
      latinName: plantFromDb.latinName,
    }
    if (!plant) {
      res.status(404).json({ message: 'Plant was not found', status: 'error' })
    } else {
      res.status(200).json({ plant, status: 'success' })
    }
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch plant', status: 'error' })
  }
})

// //PATCH
plantsRouter.patch('/:plantId', authorizeUser, async (req, res) => {
  const { plantId } = req.params
  const { name, description, image, latinName } = req.body
  try {
    await prisma.plant.update({
      where: { id: parseInt(plantId) },
      data: {
        name,
        description,
        image,
        latinName,
      },
    })
    res.status(200).json({ message: 'Plant updated successfully', status: 'success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed to update plant', status: 'error' })
  }
})

//REMOVE
plantsRouter.delete('/:plantId', authorizeUser, async (req: UserRequest, res) => {
  const { plantId } = req.params
  try {
    await prisma.plant.delete({ where: { id: parseInt(plantId) } })
    res.status(200).json({ message: 'Plant deleted successfully', status: 'success' })
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete plant', status: 'error' })
  }
})

export default plantsRouter
