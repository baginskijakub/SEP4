export * from './lib/types';

export interface IPlant {
  id: number;
  name: string;
  description: string;
  latinName: string;
  image: string;
}

export interface IGraphData{
  data: IGraphPoint[]
}

export interface IGraphPoint{
  date: string
  value: number
}
