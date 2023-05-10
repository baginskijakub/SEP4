import request from 'supertest'
import express, { Express } from 'express'
import environmentRouter from '../controllers/environmentController'
import { isValidType } from '../businessLogic/environment/isValidGraphType'
import { isValidDesiredEnv } from '../businessLogic/environment/isValidDesiredEnvironment'
import { sendDownlinkMessage } from '../businessLogic/lorawan/sendMessage'
import prisma from '../helperFunctions/setupPrisma'

//middleware express
const app: Express = express()
app.use('/', environmentRouter)

describe('PATCH',()=>{
    test('return 400 if plantId is missing',async () => {
        const response = await request(app).patch('/').send({})
        expect(response.status).toBe(400)
        expect(response.body).toEqual({message: 'No plant ID', status: 'error'})
    })
})