import WebSocket from 'ws'
import { app } from './server'
import { handleMessageEvent } from './businessLogic/lorawan/handleMessageEvent'
import http from 'http'
import { Server } from 'socket.io'
import NodeCache from 'node-cache'

const cache = new NodeCache();
export const lorawanSocket = new WebSocket(process.env.LORAWAN_SOCKET_URL)

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

const server = http.createServer(app)
const io = new Server(server)

io.on('connect', (socket) =>{
  console.log('Client connected')
  const cachedData = cache.get(socket.id)
  if(cachedData){
    console.log(`Sending data to id ${socket.id}`, cachedData)
    socket.emit('cached_data',cachedData)
  }
  socket.on('disconnect', () =>{
    console.log('Client disconnected')
  })
})

const port = process.env.PORT || 3333
const host = '0.0.0.0'
server.listen(port, host, () =>{
  console.log(`Listening at http://localhost:${port}/api`)
})
server.on('error', console.error)
