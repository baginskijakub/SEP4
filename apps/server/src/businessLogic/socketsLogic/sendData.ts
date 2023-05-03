interface IPlantCurrentEnvironment {
  temperature: number
  co2: number
  humidity: number
}

const sendData = async (inputData, socketSessionId, io) => {
  const currentEnvironment: IPlantCurrentEnvironment = {
    temperature: inputData.temperature,
    co2: inputData.co2,
    humidity: inputData.humidity,
  }

  //maybe socketSessionId needs to be gotten from somewhere else
  const socketInstance = io.to(socketSessionId)

  try {
    // Emit the currentEnvironment object as an event to the client
    socketInstance.emit('currentEnvironment', currentEnvironment)
  } catch (error) {
    console.error('Data was not send:', error)
  }
}

export default sendData
