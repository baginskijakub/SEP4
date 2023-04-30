import WebSocket from 'ws'
import dotenv from 'dotenv'
import { handleMessageEvent } from '../businessLogic/lorawan/handleMessageEvent'
function getCachedData() {
  dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
  const socket = new WebSocket(process.env.LORAWAN_SOCKET_URL)
  socket.on('open', () => {
    console.log('connected')
    socket.send(
      JSON.stringify({
        cmd: 'cq',
        filter: {
          EUI: process.env.EUI,
        },
        perPage: 10,
      }),
    )
  })
  socket.on('message', (data) => {
    handleMessageEvent(JSON.parse(data.toString()))
  })
}

getCachedData()
