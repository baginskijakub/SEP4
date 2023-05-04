import { cache } from '../../helperFunctions/singletonCache'

interface IPlantCurrentEnvironment {
  temperature: number
  co2: number
  humidity: number
}

const sendData = async (inputData, io) => {
  const currentEnvironment: IPlantCurrentEnvironment = {
    temperature: inputData.temperature,
    co2: inputData.co2,
    humidity: inputData.humidity,
  }

  const socketSessionId = cache.get(inputData.id)
  const socketInstance = io.to(socketSessionId)

  try {
    // Emit the currentEnvironment object as an event to the client
    socketInstance.emit('currentEnvironment', currentEnvironment)
  } catch (error) {
    console.error('Data was not send:', error)
  }
}

export default sendData
