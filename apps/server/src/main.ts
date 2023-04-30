import WebSocket from 'ws'
import { app } from './server'
import { handleMessageEvent } from './businessLogic/lorawan/handleMessageEvent'

export const lorawanSocket = new WebSocket(process.env.LORAWAN_SOCKET_URL)

lorawanSocket.on('open', () => {
  console.log('Lorawan socket connected')
})

lorawanSocket.on('message', (data) => {
  const message = JSON.parse(data.toString())
  console.log('Lorawan socket message received', message)
  handleMessageEvent(message)
})

lorawanSocket.on('close', async () => {
  console.log('Lorawan socket closed')
})

lorawanSocket.on('error', (error) => {
  console.log('Lorawan socket error', error)
})

const port = process.env.PORT || 3333
const host = '0.0.0.0'
const server = app.listen(port, host, () => {
  console.log(`Listening at http://localhost:${port}/api`)
})
server.on('error', console.error)
