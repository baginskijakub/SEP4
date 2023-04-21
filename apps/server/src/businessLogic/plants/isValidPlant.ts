import { IPlant } from '@sep4/types'

export function isValidPlant(obj): obj is IPlant {
  return (
    typeof obj === 'object' &&
    obj.name !== undefined &&
    obj.nickName !== undefined &&
    obj.image !== undefined &&
    obj.latinName !== undefined &&
    obj.idealEnvironment !== undefined &&
    obj.idealEnvironment.minCo2 !== undefined &&
    obj.idealEnvironment.maxCo2 !== undefined &&
    obj.idealEnvironment.minHumidity !== undefined &&
    obj.idealEnvironment.maxHumidity !== undefined &&
    obj.idealEnvironment.minTemperature !== undefined &&
    obj.idealEnvironment.maxTemperature !== undefined
  )
}
