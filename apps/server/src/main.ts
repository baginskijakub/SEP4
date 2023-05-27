import { app } from './server'
import { Server } from 'socket.io'
import { cache } from './helperFunctions/singletonCache'
import http from 'http'
import cron from 'node-cron'
import { WebSocket } from 'ws'
import { reevaluateTasksDeadlines } from './businessLogic/tasks/reevaluateTasksDeadlines'
import { sendUpdateOnConnection } from './businessLogic/sockets/sendUpdateOnConnections'
import { handleMessageEvent } from './businessLogic/lorawan/handleMessageEvent'

export let lorawanSocket: WebSocket

function createWebSocket() {
  lorawanSocket = new WebSocket(process.env.LORAWAN_SOCKET_URL)

  lorawanSocket.on('open', () => {
    console.log('Lorawan socket connected')
  })

  lorawanSocket.on('message', (data) => {
    const message = JSON.parse(data.toString())
    console.log('Lorawan socket message received', message)
    handleMessageEvent(message)
  })

  lorawanSocket.on('close', () => {
    console.log('Lorawan socket closed')
    setTimeout(createWebSocket, 1000)
    console.log('Lorawan socket reconnecting')
  })

  lorawanSocket.on('error', (error) => {
    console.log('Lorawan socket error', error)
  })
}

createWebSocket()
const server = http.createServer(app)

const port = process.env.PORT || 0
const host = '0.0.0.0'

server.listen(port, host, () => {
  console.log(`Listening at http://localhost:${port}/api`)
})

export const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

io.on('connect', (socket) => {
  console.log('Client connected')
  socket.on('connectInit', (plantId: number) => {
    if (plantId) {
      sendUpdateOnConnection(socket, plantId)
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

cron.schedule('0 3 * * *', () => {
  console.log('Running cron job')
  reevaluateTasksDeadlines()
  console.log('Cron job finished')
})
