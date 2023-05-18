import axios from 'axios'
axios.defaults.withCredentials = true
import { SERVER_URL } from "../config";

const login = (username: string, password: string) => {
  return axios.get(`${SERVER_URL}/users?username=${username}&password=${password}`).then((response) => {
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Error')
    }
  })
}

export { login }
