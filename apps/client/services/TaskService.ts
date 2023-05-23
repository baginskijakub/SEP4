import axios from 'axios'
import { ITask } from "@sep4/types";
axios.defaults.withCredentials = true
import { SERVER_URL } from "../config";


const getCurrentTasks = ():Promise<ITask[]> => {
  return axios.get(`${SERVER_URL}/tasks/`).then((response) => {
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Error fetching data')
    }
  })
}

const completeTask = (taskId: number):Promise<ITask> => {
  return axios.delete(`${SERVER_URL}/v1/tasks/${taskId}`).then((response) => {
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Error fetching data')
    }
  })
}

const getAllTasksWithEpoch = ():Promise<ITask[]> => {
  return axios.get(`${SERVER_URL}/tasks/epoch`).then((response) => {
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Error fetching data')
    }
  })
}


const createTask = (task: ITask) => {
  return axios.post(`${SERVER_URL}/tasks`, task).then((response) => {
    if (response.status === 201) {
      return response.data
    } else {
      throw new Error('Error fetching data')
    }
  })
}

const getAllTasks: () => Promise<ITask[]> = () => {
  return axios.get(`${SERVER_URL}/tasks/`).then((response) => {
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Error fetching data')
    }
  })
}

export { getCurrentTasks, completeTask, createTask, getAllTasks, getAllTasksWithEpoch };

