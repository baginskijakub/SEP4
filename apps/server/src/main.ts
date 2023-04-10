import express from 'express'
import * as dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userRouter from './controllers/userController'
import WebSocket from 'ws'
dotenv.config()

export const lorawanSocket = new WebSocket(process.env.LORAWAN_SOCKET_URL)

const app = express()

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

app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/users', userRouter)

const port = process.env.PORT || 3333
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`)
})
server.on('error', console.error)
