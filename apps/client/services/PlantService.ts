import { IPlant, IPlantCurrentEnvironment } from '@sep4/types'
import axios from 'axios'

axios.defaults.withCredentials = true

import { SERVER_URL } from '../config'
const getPlantEnvironmentHistory = (plantId: number, type: string) => {
  let token
  if (typeof window !== 'undefined') token = `Bearer ${localStorage.getItem('token')}`
  return axios
    .get(`${SERVER_URL}/plants/${plantId}/environment/${type}`, { headers: { Authorization: token } })
    .then((response) => {
      if (response.status === 200) {
        return response.data
      } else {
        throw new Error('Error fetching data')
      }
    })
}

const getPlantById = (plantId: number) => {
  let token
  if (typeof window !== 'undefined') token = `Bearer ${localStorage.getItem('token')}`
  return axios.get(`${SERVER_URL}/plants/${plantId}`, { headers: { Authorization: token } }).then((response) => {
    if (response.status === 200) {
      console.log(response.data)
      return response.data
    } else {
      throw new Error('Error fetching data')
    }
  })
}

const addPlant = (plant: IPlant) => {
  let token
  if (typeof window !== 'undefined') token = `Bearer ${localStorage.getItem('token')}`
  return axios.post(`${SERVER_URL}/plants`, plant, { headers: { Authorization: token } }).then((response) => {
    if (response.status === 201) {
      return response.data
    } else {
      throw new Error('Error fetching data')
    }
  })
}

const updatePlant = (plant: IPlant) => {
  let token
  if (typeof window !== 'undefined') token = `Bearer ${localStorage.getItem('token')}`
  return axios
    .patch(`${SERVER_URL}/plants/${plant.id}`, plant, { headers: { Authorization: token } })
    .then((response) => {
      if (response.status === 200) {
        return response.data
      } else {
        throw new Error('Error fetching data')
      }
    })
}

const deletePlant = (plantId: number) => {
  let token
  if (typeof window !== 'undefined') token = `Bearer ${localStorage.getItem('token')}`
  return axios.delete(`${SERVER_URL}/plants/${plantId}`, { headers: { Authorization: token } }).then((response) => {
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Error fetching data')
    }
  })
}

const getAllPlants = () => {
  let token
  if (typeof window !== 'undefined') token = `Bearer ${localStorage.getItem('token')}`
  return axios.get(`${SERVER_URL}/plants/`, { headers: { Authorization: token } }).then((response) => {
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Error fetching data')
    }
  })
}

const adjustEnvironment = (id: number, environment: IPlantCurrentEnvironment) => {
  let token
  if (typeof window !== 'undefined') token = `Bearer ${localStorage.getItem('token')}`
  return axios
    .patch(`${SERVER_URL}/plants/${id}/environment`, environment, { headers: { Authorization: token } })
    .then((response) => {
      if (response.status === 200) {
        return response.data
      } else {
        throw new Error('Error sending data')
      }
    })
}

const adjustWatering = (id: number, watering: number) => {
  let token
  if (typeof window !== 'undefined') token = `Bearer ${localStorage.getItem('token')}`
  return axios
    .patch(`${SERVER_URL}/plants/${id}/watering`, watering, { headers: { Authorization: token } })
    .then((response) => {
      if (response.status === 200) {
        return response.data
      } else {
        throw new Error('Error sending data')
      }
    })
}

export {
  getPlantEnvironmentHistory,
  getPlantById,
  addPlant,
  updatePlant,
  deletePlant,
  getAllPlants,
  adjustEnvironment,
  adjustWatering,
}
