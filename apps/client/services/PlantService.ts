import { IPlant, IPlantCurrentEnvironment } from "@sep4/types";
import axios from 'axios'

axios.defaults.withCredentials = true

const getPlantEnvironmentHistory = (plantId: number, type: string) => {
  return axios.get(`http://localhost:3333/api/v1/plants/${plantId}/environment/${type}`).then((response) => {
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Error fetching data')
    }
  })
}

const getPlantById = (plantId: number) => {
  return axios.get(`http://localhost:3333/api/v1/plants/${plantId}`).then((response) => {
    if (response.status === 200) {
      console.log(response.data)
      return response.data
    } else {
      throw new Error('Error fetching data')
    }
  })
}

const addPlant = (plant: IPlant) => {
  return axios.post(`http://localhost:3333/api/v1/plants`, plant).then((response) => {
    if (response.status === 201) {
      return response.data
    } else {
      throw new Error('Error fetching data')
    }
  })
}

const updatePlant = (plant: IPlant) => {
  return axios.patch(`http://localhost:3333/api/v1/plants/${plant.id}`, plant).then((response) => {
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Error fetching data')
    }
  })
}

const deletePlant = (plantId: number) => {
  return axios.delete(`http://localhost:3333/api/v1/plants/${plantId}`).then((response) => {
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Error fetching data')
    }
  })
}

const getAllPlants = () => {
  return axios.get(`http://localhost:3333/api/v1/plants/`).then((response) => {
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Error fetching data')
    }
  })
}

const adjustEnvironment = (id: number, environment: IPlantCurrentEnvironment) => {
  return axios.post(`http://localhost:3333/api/v1/plants/${id}/environment`, environment).then((response) => {
    if (response.status === 201) {
      return response.data
    } else {
      throw new Error('Error sending data')
    }
  })
}

export { getPlantEnvironmentHistory, getPlantById, addPlant, updatePlant, deletePlant, getAllPlants, adjustEnvironment }
