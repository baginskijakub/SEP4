import axios from 'axios'
import { ITask } from '@sep4/types'
axios.defaults.withCredentials = true
import { SERVER_URL } from '../config';


const getCurrentTasks = (): Promise<ITask[]> => {
  let token
  if (typeof window !== 'undefined') token = `Bearer ${localStorage.getItem('token')}`
  return axios.get(`${SERVER_URL}/tasks/current`, { headers: { Authorization: token } }).then((response) => {
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Error fetching data')
    }
  })
}

const completeTask = (taskId: number): Promise<ITask> => {
  let token
  if (typeof window !== 'undefined') token = `Bearer ${localStorage.getItem('token')}`
  return axios.delete(`${SERVER_URL}/tasks/${taskId}`, { headers: { Authorization: token } }).then((response) => {
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Error fetching data')
    }
  })
}

const getAllTasksWithEpoch = (): Promise<ITask[]> => {
  let token
  if (typeof window !== 'undefined') token = `Bearer ${localStorage.getItem('token')}`
  return axios.get(`${SERVER_URL}/tasks/epoch`, { headers: { Authorization: token } }).then((response) => {
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Error fetching data')
    }
  })
}

const createTask = (task: ITask) => {
  let token
  if (typeof window !== 'undefined') token = `Bearer ${localStorage.getItem('token')}`
  return axios
    .post(`${SERVER_URL}/tasks`, task, { headers: { Authorization: token } })
    .then((response) => {
      if (response.status === 201) {
        return response.data
      } else {
        throw new Error('Error fetching data')
      }
    })
}

const getAllTasks: () => Promise<ITask[]> = () => {
  let token
  if (typeof window !== 'undefined') token = `Bearer ${localStorage.getItem('token')}`
  return axios.get(`${SERVER_URL}/tasks/`, { headers: { Authorization: token } }).then((response) => {
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Error fetching data')
    }
  })
}

export { getCurrentTasks, completeTask, createTask, getAllTasks, getAllTasksWithEpoch }
