import axios from 'axios'
axios.defaults.withCredentials = true
const getPlantEnvironmentHistory = (plantId: number, type: string) => {

  return axios.get(`http://localhost:3333/api/v1/plants/${plantId}/environment/${type}`).then((response) => {
    console.log(response)
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Error fetching data')
    }
  })
}

export { getPlantEnvironmentHistory }
