import axios from 'axios'
axios.defaults.withCredentials = true
import { SERVER_URL } from '../config'
const register = (email: string, password: string) => {
  return axios
    .post(`${SERVER_URL}/users`, {
      email,
      password,
    })
    .then((response) => {
      if (response.status === 201) {
        return response.data
      } else {
        throw new Error(response.data.message)
      }
    })
    .catch((error) => {
      throw new Error(error.response.data.message)
    })
}

export { register }
