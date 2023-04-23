import { IPlant } from '@sep4/types'
import axios from 'axios'

axios.defaults.withCredentials = true

const getPlantEnvironmentHistory = (plantId: number, type: string) => {

  return axios.get(`http://localhost:3333/api/v1/plants/${plantId}/environment/${type}`).then((response) => {
    console.log(response)
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
    console.log(response)
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Error fetching data')
    }
  })
}

export { getPlantEnvironmentHistory, getPlantById, addPlant, updatePlant, deletePlant, getAllPlants }
