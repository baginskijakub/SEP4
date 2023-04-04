import axios from "axios";

const login:(username: string, password: string) => Promise<boolean> = (username: string, password: string) => {
  return axios.get('http://localhost:3333/login',
    {
      params: {
        username: username,
        password: password
      }
    }
  ).then((response) => {
    return response.data
  })
}

export { login };
