export * from './lib/types'

export interface IPlant {
  id: number
  name: string
  nickName: string
  latinName: string
  image: string
  idealEnvironment?: { mintemp: number,
    maxtemp: number,
    minhum: number,
    maxhum: number,
    minco2: number,
    maxco2: number}
}

export interface IGraphData {
  //Not sure about light, TBD
  type: 'temperature' | 'humidity' | 'co2' | 'light'
  data: IGraphPoint[]
}

export interface IGraphPoint {
  date: string
  value: number
}

export interface IGraphData{
  //Not sure about light, TBD
  type: 'temperature' | 'humidity' | 'co2' | 'light'
  data: IGraphPoint[]
}

export interface IGraphPoint{
  date: string
  value: number
}

export interface IUser {
  id: number;
  name: string;
  email: string;
}
