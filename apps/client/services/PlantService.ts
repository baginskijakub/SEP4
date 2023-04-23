import { IPlant } from '@sep4/types'
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

const getPlantById = (plantId: number) => {
  return {
    id: 1,
    name: 'plant1',
    nickName: 'plant nickname',
    latinName: 'latin name',
    image: 'https://www.gardeningknowhow.com/wp-content/uploads/2008/05/rubber-plant.jpg',
    idealEnvironment: {
      mintemp: 20,
      maxtemp: 50,
      minhum: 50,
      maxhum: 100,
      minco2: 50,
      maxco2: 70
    }
  }
}


const deletePlant = (plantId: number) => {
  console.log('delete',plantId)
  return {
     ///
  }
}


export { getPlantEnvironmentHistory, getPlantById, deletePlant }
