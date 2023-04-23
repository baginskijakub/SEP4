export * from './lib/types'

export interface IPlant {
  id: number
  name: string
  nickName: string
  latinName: string
  image: string
  idealEnvironment?: IPlantIdealEnvironment
  currentEnvironment?: IPlantCurrentEnvironment
}

export interface IPlantCurrentEnvironment {
  temperature: number
  co2: number
  humidity: number
}

export interface IGraphPoint {
  date: string
  value: number
}

export interface IGraphData {
  type: 'temperature' | 'humidity' | 'co2'
  data: IGraphPoint[]
}

export interface IGraphPoint {
  date: string
  value: number
}

export interface IUser {
  name: string
  email: string
}

export interface IPlantIdealEnvironment {
  minTemperature: number
  maxTemperature: number
  minHumidity: number
  maxHumidity: number
  minCo2: number
  maxCo2: number
}

export interface IPlantIdealEnvironment {
  mintemp: number;
  maxtemp: number;
  minhum: number;
  maxhum: number;
  minco2: number;
  maxco2: number;
}
