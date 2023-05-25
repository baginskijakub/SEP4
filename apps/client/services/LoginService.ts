import axios from 'axios'
axios.defaults.withCredentials = true
import { SERVER_URL } from '../config'

const login = (email: string, password: string) => {
  return axios.get(`${SERVER_URL}/users?email=${email}&password=${password}`).catch((error) => {
    throw new Error(error.message)
  }).then((response) => {
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(response.data.message)
    }
  }) 
}

export { login }
