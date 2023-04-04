import express from 'express'
import * as dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userRouter from './controllers/userController'
dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to server!' })
})

app.use('/api/v1/users', userRouter)

const port = process.env.PORT || 3333
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`)
})
server.on('error', console.error)
