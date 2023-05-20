import { IPlant, IPlantCurrentEnvironment } from "@sep4/types";
import axios from 'axios'

axios.defaults.withCredentials = true
import { SERVER_URL } from "../config";
const getPlantEnvironmentHistory = (plantId: number, type: string) => {
  return axios.get(`${SERVER_URL}/plants/${plantId}/environment/${type}`).then((response) => {
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Error fetching data')
    }
  })
}

const getPlantById = (plantId: number) => {
  return axios.get(`${SERVER_URL}/plants/${plantId}`).then((response) => {
    if (response.status === 200) {
      console.log(response.data)
      return response.data
    } else {
      throw new Error('Error fetching data')
    }
  })
}

const addPlant = (plant: IPlant) => {
  return axios.post(`${SERVER_URL}/plants`, plant).then((response) => {
    if (response.status === 201) {
      return response.data
    } else {
      throw new Error('Error fetching data')
    }
  })
}

const updatePlant = (plant: IPlant) => {
  return axios.patch(`${SERVER_URL}/plants/${plant.id}`, plant).then((response) => {
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Error fetching data')
    }
  })
}

const deletePlant = (plantId: number) => {
  return axios.delete(`${SERVER_URL}/plants/${plantId}`).then((response) => {
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Error fetching data')
    }
  })
}

const getAllPlants = () => {
  return axios.get(`${SERVER_URL}/plants/`).then((response) => {
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Error fetching data')
    }
  })
}

const adjustEnvironment = (id: number, environment: IPlantCurrentEnvironment) => {
  return axios.patch(`${SERVER_URL}/plants/${id}/environment`, environment).then((response) => {
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Error sending data')
    }
  })
}

const adjustWatering = (id: number, watering: number) => {
  return axios.patch(`${SERVER_URL}/plants/${id}/watering`, watering).then((response) => {
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Error sending data')
    }
  })
}

export { getPlantEnvironmentHistory, getPlantById, addPlant, updatePlant, deletePlant, getAllPlants, adjustEnvironment, adjustWatering }
