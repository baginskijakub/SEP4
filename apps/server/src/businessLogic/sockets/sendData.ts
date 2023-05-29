import { IPlantCurrentEnvironment } from '@sep4/types'
import { cache } from '../../helperFunctions/singletonCache'
import { io } from '../../main'
import { GraphDataCreateInput } from '../lorawan/handleMessageEvent'

const sendDataViaSocket = async (inputData: unknown, eventName: string) => {
  if (eventName === 'update') {
    const dataToSend = inputData as GraphDataCreateInput[]
    const currentEnvironment: IPlantCurrentEnvironment = {
      temperature: dataToSend[1].value,
      co2: dataToSend[2].value,
      humidity: dataToSend[0].value,
    }

    const listeners = cache.get<string[]>(dataToSend[0].plantId)
    if (listeners) {
      for (const listener of listeners) {
        const socketInstance = io.to(listener)

        try {
          // Emit the currentEnvironment object as an event to the client
          socketInstance.emit(`${eventName}-${dataToSend[0].plantId}`, currentEnvironment)
          console.log("Data was sent to client's socket")
        } catch (error) {
          console.error('Data was not send:', error)
        }
      }
    }
  }
}

export default sendDataViaSocket
