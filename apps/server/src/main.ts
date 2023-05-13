import WebSocket from 'ws'
import { app } from './server'
import { handleMessageEvent } from './businessLogic/lorawan/handleMessageEvent'
import { Server } from 'socket.io'
import { cache } from './helperFunctions/singletonCache'
import http from 'http'

export const lorawanSocket = new WebSocket(process.env.LORAWAN_SOCKET_URL)

const server = http.createServer(app)

lorawanSocket.on('open', () => {
  console.log('Lorawan socket connected')
})

lorawanSocket.on('message', (data) => {
  const message = JSON.parse(data.toString())
  console.log('Lorawan socket message received', message)
  handleMessageEvent(message)
  io.emit('lorawan_message', message)
})

lorawanSocket.on('close', async () => {
  console.log('Lorawan socket closed')
})

lorawanSocket.on('error', (error) => {
  console.log('Lorawan socket error', error)
})

const port = process.env.PORT || 0
const host = '0.0.0.0'

server.listen(port, host, () => {
  console.log(`Listening at http://localhost:${port}/api`)
})

export const io = new Server(server)

io.on('connect', (socket) => {
  console.log('Client connected')
  socket.on('connectInit', (plantId: number) => {
    if (plantId) {
      const listeners = cache.get<string[]>(plantId)
      if (listeners) {
        listeners.push(socket.id)
        cache.set(plantId, listeners)
      } else cache.set(plantId, [socket.id])
    }
  })
  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})
