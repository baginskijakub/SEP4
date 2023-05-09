import express from 'express'
import { IGraphData, IGraphPoint } from '@sep4/types'
import prisma from '../helperFunctions/setupPrisma'
import { isValidType } from '../businessLogic/plants/isValidGraphType'
import { formatDate } from '../businessLogic/plants/formatDate'
import authorizeUser, { UserRequest } from '../middleware/authorizeUser'

const environmentRouter = express.Router({ mergeParams: true })

environmentRouter.use(authorizeUser)

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

    res.status(200).json(formattedGraphData)
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized', status: 'error' })
    return
  }
})

export default environmentRouter
