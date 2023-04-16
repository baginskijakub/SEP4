export * from './lib/types';

export interface IPlant {
  id: number;
  name: string;
  description: string;
  latinName: string;
  image: string;
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

export interface IPlantIdealEnvironment {
  mintemp: number;
  maxtemp: number;
  minhum: number;
  maxhum: number;
  minco2: number;
  maxco2: number;
}
