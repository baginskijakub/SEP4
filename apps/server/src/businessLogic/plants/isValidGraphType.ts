import { IGraphData } from '@sep4/types'

export function isValidType(type: string): type is IGraphData['type'] {
  return ['temperature', 'humidity', 'co2'].includes(type)
}
