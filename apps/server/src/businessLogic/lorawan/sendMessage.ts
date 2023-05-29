import { lorawanSocket } from '../../main'
export function sendDownlinkMessage(data: string, port: number) {
  const eui = process.env.EUI.toString().replace(/\n/, '')
  const json = JSON.stringify({
    cmd: 'tx',
    EUI: eui,
    port: 1,
    confirmed: false,
    data,
  })
  lorawanSocket.send(json)
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
