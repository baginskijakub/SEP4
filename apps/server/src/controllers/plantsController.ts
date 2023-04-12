import jwt from 'jsonwebtoken'
import express from 'express'
import prisma from '../helperFunctions/setupPrisma'
import { IGraphData, IGraphPoint } from '@sep4/types'
import { isValidType } from '../businessLogic/plants/isValidGraphType'
import { formatDate } from '../businessLogic/plants/formatDate'

const plantsRouter = express.Router()

plantsRouter.get('/:plantId/environment/:type', async (req, res) => {
  const token = req.cookies.token
  if (!token) {
    res.status(401).json({ message: 'Unauthorized', status: 'error' })
    return
  }
  try {
    const decodedToken = jwt.verify(token, process.env.WEB_TOKEN_SECRET) as { username: string }
    if (!decodedToken) {
      res.status(401).json({ message: 'Unauthorized', status: 'error' })
      return
    }

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
        plantId: Number(plantId),
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

export default plantsRouter
