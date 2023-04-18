import WebSocket from 'ws'
import { app } from './server'

export const lorawanSocket = new WebSocket(process.env.LORAWAN_SOCKET_URL)

lorawanSocket.on('open', () => {
  console.log('Lorawan socket connected')
})

lorawanSocket.on('message', (data) => {
  console.log('Lorawan socket message', data)
})

lorawanSocket.on('close', () => {
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
