import axios from 'axios'

const login = (username: string, password: string) => {
  return axios.get(`http://localhost:3333/api/v1/users?username=${username}&password=${password}`).then((response) => {
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Error')
    }
  })
}

export { login }
