import request from 'supertest'
import express, { Express } from 'express'
import environmentRouter from '../controllers/environmentController'
import { isValidType } from '../businessLogic/environment/isValidGraphType'
import { isValidDesiredEnv } from '../businessLogic/environment/isValidDesiredEnvironment'
import { sendDownlinkMessage } from '../businessLogic/lorawan/sendMessage'
import prisma from '../helperFunctions/setupPrisma'

//i found it on expressjs tutorial, idk
const app: Express = express()
app.use('/', environmentRouter)

describe('PATCH',()=>{
    //case1: code 400 for missing ID
    test('return 400 if plantId is missing',async () => {
        const response = await request(app).patch('/').send({})
        expect(response.status).toBe(400)
        expect(response.body).toEqual({message: 'No plant ID', status: 'error'})
    })

    //case2: code 400 for invalid type
    test('return 400 if environment is invalid', async() => {
        const response = await request(app).patch('/1').send({})
        expect(response.status).toBe(400)
        expect(response.body).toBe({message: 'Invalid desired environment', status: 'error'})

    })

    //case3: code 200 + downlink message if all info valid
    test('return 200 and send downlink message is all data provided is valid', async() =>{
        //database call mock, idk if i can use the test database?
        jest.spyOn(prisma.graphData, 'findMany').mockResolvedValueOnce([])
        jest.spyOn(sendDownlinkMessage, 'mockImplementation')
        const response = await request(app).patch('/1').send({
            humidity: 10,
            temperature: 25,
            co2: 1000,
        })
        expect(response.status).toBe(200)
        expect(response.body.status).toBe('success')
        expect(sendDownlinkMessage).toHaveBeenCalled()
    })

    //case4: code 200 is message sent
    it('return 200 if message is successfully sent', async () => {
        const response = await request(app)
          .patch('/plants/1/environment')
          .send({ humidity: 50, temperature: 25, co2: 500 });
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe('success');
      });
})