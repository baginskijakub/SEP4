import express from 'express'
import { IGraphData, IGraphPoint } from '@sep4/types'
import prisma from '../helperFunctions/setupPrisma'
import { isValidType } from '../businessLogic/environment/isValidGraphType'
import { formatDate } from '../businessLogic/plants/formatDate'
import authorizeUser, { UserRequest } from '../middleware/authorizeUser'
import { isValidDesiredEnv } from '../businessLogic/environment/isValidDesiredEnvironment'
import { sendDownlinkMessage } from '../businessLogic/lorawan/sendMessage'

const environmentRouter = express.Router({ mergeParams: true })

environmentRouter.use(authorizeUser)

environmentRouter.patch('/', async (req: UserRequest, res) => {
  const { plantId } = req.params
  const desiredEnvironment = req.body as unknown
  if (isNaN(Number(plantId)) || !(await prisma.plant.findUnique({ where: { id: Number(plantId) } })))
    return res.status(400).json({ message: 'Invalid plant id', status: 'error' })
  if (!desiredEnvironment || !isValidDesiredEnv(desiredEnvironment))
    return res.status(400).json({ message: 'Invalid desired environment', status: 'error' })

  const humidityHex = (desiredEnvironment.humidity * 10).toString(16).padStart(4, '0')
  const temperatureHex = (desiredEnvironment.temperature * 10).toString(16).padStart(4, '0')
  const co2Hex = desiredEnvironment.co2.toString(16).padStart(4, '0')
  const payload = `${humidityHex}${temperatureHex}${co2Hex}`

  try {
    sendDownlinkMessage(payload, Number(plantId))
    await prisma.$disconnect()

    return res.status(200).json({ payload, status: 'success' })
  } catch (error) {
    return res.status(500).json({ message: 'Server error', status: 'error' })
  }
})

environmentRouter.get('/:type', async (req: UserRequest, res) => {
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
    await prisma.$disconnect()

    return res.status(200).json(formattedGraphData)
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized', status: 'error' })
    return
  }
})

export default environmentRouter
