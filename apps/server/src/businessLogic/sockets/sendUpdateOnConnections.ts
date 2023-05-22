import { Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import prisma from '../../helperFunctions/setupPrisma'
import { IPlantCurrentEnvironment } from '@sep4/types'

export async function sendUpdateOnConnection(
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,
  plantId: number,
) {
  try {
    const humidity = await prisma.graphData.findMany({
      where: {
        plantId: plantId,
        type: 'humidity',
      },
      orderBy: {
        dateEpoch: 'desc',
      },
      take: 1,
    })
    const temperature = await prisma.graphData.findMany({
      where: {
        plantId: plantId,
        type: 'temperature',
      },
      orderBy: {
        dateEpoch: 'desc',
      },
      take: 1,
    })
    const co2 = await prisma.graphData.findMany({
      where: {
        plantId: plantId,
        type: 'co2',
      },
      orderBy: {
        dateEpoch: 'desc',
      },
      take: 1,
    })
    const currentEnvironment: IPlantCurrentEnvironment = {
      temperature: temperature[0].value,
      co2: co2[0].value,
      humidity: humidity[0].value,
    }

    socket.emit(`update-${plantId}`, currentEnvironment)
  } catch (error) {
    return
  }
  return null
}
