import express from 'express'
import * as dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userRouter from './controllers/usersController'
import plantsRouter from './controllers/plantsController'
import cors from 'cors'
import http from 'http'
import {Server} from 'socket.io'


dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

export const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(cors({ origin: 'http://localhost:4200', credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/users', userRouter)

app.use('/api/v1/plants', plantsRouter)

io.on('connect', (socket) => {
    console.log('Client connected')
    socket.on('data_Receive', (data) =>{
        console.log('Data received:', data)
        socket.emit('response', {message: 'test response'})
    })
    socket.on('disconnect', () => {
        console.log('Client disconnected')
    })
})

const port = process.env.PORT || 3000
server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})