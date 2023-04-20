import { lorawanSocket } from '../../main'
export function sendDownlinkMessage(data: string) {
  //TODO handle confirmation message also in messageEvent
  lorawanSocket.send(
    JSON.stringify({
      cmd: 'tx',
      EUI: process.env.EUI,
      port: 2,
      confirmed: false,
      data,
    }),
  )
}

export function sendQueryMessage(from?: number, to?: number, perPage?: number) {
  lorawanSocket.send(
    JSON.stringify({
      cmd: 'cq',
      filter: {
        EUI: process.env.EUI,
        from,
        to,
      },
      perPage,
    }),
  )
}
