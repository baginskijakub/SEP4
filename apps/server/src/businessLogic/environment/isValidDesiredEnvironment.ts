import { IPlantCurrentEnvironment } from '@sep4/types'

export function isValidDesiredEnv(type: unknown): type is IPlantCurrentEnvironment {
  return (
    typeof type === 'object' &&
    type !== null &&
    type['co2'] !== undefined &&
    type['humidity'] !== undefined &&
    type['temperature'] !== undefined &&
    typeof type['co2'] === 'number' &&
    typeof type['humidity'] === 'number' &&
    typeof type['temperature'] === 'number' &&
    type['co2'] >= 0 &&
    type['humidity'] >= 0
  )
}
