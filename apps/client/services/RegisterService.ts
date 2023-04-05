import axios from "axios";

const register = (username: string, password: string) => {
    return axios.post(`http://localhost:3333//api/v1/users`, {
      username,
      password
    }).then((response) => {
      if (response.status === 201) {
        return response.data;
      } else {
        throw new Error("Error"); 
      }
    })
  }

export { register };