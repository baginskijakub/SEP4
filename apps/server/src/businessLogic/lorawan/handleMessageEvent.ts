import prisma from '../../helperFunctions/setupPrisma'
import sendDataViaSocket from '../sockets/sendData'

interface ILorawanUplinkMessage {
  cmd: string // identifies type of message, rx = uplink message
  EUI: string // device EUI, 16 hex digits (without dashes)
  ts: number // server timestamp as number (milliseconds from Linux epoch)
  ack: boolean // acknowledgement flag as set by device
  bat: number // device battery status, response to the DevStatusReq LoRaWAN MAC Command
  fcnt: number // frame counter, a 32-bit number
  port: number // port as sent by the end device

  encdata?: string // data payload (APPSKEY encrypted hex string)
  // only present if APPSKEY is not assigned to device

  data?: string // data payload (decrypted, plaintext hex string)
  // only present if APPSKEY is assigned to device
}

interface ILorawanCacheResponseMessage {
  cmd: string // identifies type of message, cq = cache query
  filter?: {
    // repeats query filter
    from?: number
    to?: number
    EUI?: string
  }
  page: number // repeats query page
  perPage: number // repeats query perPage
  total: number // total number of matching results in cache
  // use for paging through history
  cache: ILorawanUplinkMessage[] // array of cached messages, ordered by descending timestamp
}

export type GraphDataCreateInput = { plantId: number; type: string; value: number; dateEpoch: number }

export async function handleMessageEvent(lorawanMessage: ILorawanUplinkMessage | ILorawanCacheResponseMessage) {
  if (isUplinkMessage(lorawanMessage)) {
    const payload = lorawanMessage.data
    if (!payload) return
    try {
      const dataToSave = parsePayload(payload, Math.round(lorawanMessage.ts / 1000))
      sendDataViaSocket(dataToSave, 'update')

      await prisma.graphData.createMany({
        data: dataToSave,
      })
      console.log('Graph data has been saved')
    } catch (e) {
      console.log(e.message)
    }
  } else if (lorawanMessage.cmd === 'cq') {
    const cache = lorawanMessage.cache
    const dataToSave: GraphDataCreateInput[] = []
    for (const message of cache) {
      const payload = message.data
      if (!payload) continue
      try {
        dataToSave.push(...parsePayload(payload, Math.round(message.ts / 1000)))
      } catch (e) {
        console.log(e.message)
      }
    }
    try {
      await prisma.graphData.createMany({
        data: dataToSave,
      })
      console.log('Graph data has been saved')
    } catch (e) {
      console.log(e.message)
    }
  }
}

// Type guard helper function

function isUplinkMessage(
  lorawanMessage: ILorawanUplinkMessage | ILorawanCacheResponseMessage,
): lorawanMessage is ILorawanUplinkMessage {
  return lorawanMessage.cmd === 'rx'
}

// Parse payload to data format suitable to store in database

export function parsePayload(payload: string, timestamp: number) {
  if (payload.length !== 12 || !payload.match(/^([0-9A-Fa-f]+)$/g)) throw new Error('Invalid payload')

  const data = payload.split('').reduce((acc: string[], curr: string, index: number) => {
    const position = Math.floor(index / 4)
    if (!acc[position]) {
      acc[position] = ''
    }
    acc[position] += curr
    return acc
  }, [])
  const humidity = parseInt(data[0], 16) / 10
  const temperature = parseInt(data[1], 16) / 10
  const co2 = parseInt(data[2], 16)

  const dataToSave: GraphDataCreateInput[] = []

  dataToSave.push({
    plantId: 12,
    type: 'humidity',
    value: humidity,
    dateEpoch: timestamp,
  })
  dataToSave.push({
    plantId: 12,
    type: 'temperature',
    value: temperature,
    dateEpoch: timestamp,
  })
  dataToSave.push({
    plantId: 12,
    type: 'co2',
    value: co2,
    dateEpoch: timestamp,
  })

  return dataToSave
}
