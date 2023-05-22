import axios from 'axios'
axios.defaults.withCredentials = true

import { SERVER_URL } from '../config'
const register = (username: string, password: string) => {
  return axios
    .post(`${SERVER_URL}/users`, {
      username,
      password,
    })
    .then((response) => {
      if (response.status === 201) {
        return response.data
      } else {
        throw new Error('Error')
      }
    })
}

export { register }
