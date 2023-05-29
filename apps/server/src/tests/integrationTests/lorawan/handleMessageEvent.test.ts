import prisma from '../../../helperFunctions/setupPrisma'
import bcrypt from 'bcrypt'
import { handleMessageEvent } from '../../../businessLogic/lorawan/handleMessageEvent'

describe('Handle lorawan message function', () => {
  beforeAll(async () => {
    const encryptedPassword = await bcrypt.hash('Password123', 10)
    await prisma.user.create({
      data: {
        email: 'test_user',
        password: encryptedPassword,
      },
    })
    await prisma.plant.create({
      data: {
        id: 12,
        name: 'Test plant 1',
        nickName: 'Cool nickname',
        image: 'plant1.jpg',
        latinName: 'Plantus testus 1',
        email: 'test_user',
        minCo2: 100,
        maxCo2: 200,
        minHumidity: 10,
        maxHumidity: 20,
        minTemperature: 10,
        maxTemperature: 20,
      },
    })
  })

  afterAll(async () => {
    await prisma.plant.deleteMany()
    await prisma.user.deleteMany()
  })

  afterEach(async () => {
    await prisma.graphData.deleteMany()
  })

  test('corectly saves the data to the database when the message type is rx', async () => {
    const mockLorawanMessage = {
      cmd: 'rx',
      EUI: '0004A30B001C0B0C',
      ts: 123456789,
      fcnt: 1,
      port: 1,
      ack: false,
      bat: 255,
      data: '00DE013B038E',
    }

    await handleMessageEvent(mockLorawanMessage)
    const graphData = await prisma.graphData.findMany({ orderBy: { value: 'asc' } })
    expect(graphData.length).toEqual(3)

    expect(graphData[0].value).toEqual(31.5)
    expect(graphData[1].value).toEqual(222)
    expect(graphData[2].value).toEqual(910)
    expect(graphData[0].dateEpoch).toEqual(Math.round(123456789 / 1000))
  })

  test('corectly saves the data to the database when the message type is cq', async () => {
    const mockLorawanMessage = {
      cmd: 'cq',
      page: 0,
      perPage: 10,
      total: 1,
      cache: [
        {
          cmd: 'rx',
          EUI: '0004A30B001C0B0C',
          ts: 123456789,
          fcnt: 1,
          port: 1,
          ack: false,
          bat: 255,
          data: '00DE013B038E',
        },
      ],
    }

    await handleMessageEvent(mockLorawanMessage)
    const graphData = await prisma.graphData.findMany({ orderBy: { value: 'asc' } })
    expect(graphData.length).toEqual(3)

    expect(graphData[0].value).toEqual(31.5)
    expect(graphData[1].value).toEqual(222)
    expect(graphData[2].value).toEqual(910)
    expect(graphData[0].dateEpoch).toEqual(Math.round(123456789 / 1000))
  })

  test('does not save the data to the database when the message type is not rx or cq', async () => {
    const mockLorawanMessage = {
      cmd: 'tx',
      EUI: '0004A30B001C0B0C',
      ts: 123456789,
      fcnt: 1,
      port: 1,
      ack: false,
      bat: 255,
      data: '00DE013B038E',
    }

    await handleMessageEvent(mockLorawanMessage)
    const graphData = await prisma.graphData.findMany({ orderBy: { value: 'asc' } })
    expect(graphData.length).toEqual(0)
  })

  test('does not save to database if payload is missing', async () => {
    const mockLorawanMessage = {
      cmd: 'rx',
      EUI: '0004A30B001C0B0C',
      ts: 123456789,
      fcnt: 1,
      port: 1,
      ack: false,
      bat: 255,
    }

    await handleMessageEvent(mockLorawanMessage)
    const graphData = await prisma.graphData.findMany({ orderBy: { value: 'asc' } })
    expect(graphData.length).toEqual(0)
  })

  test('if same cache message is invalid payload, the rest of data is still correctly saved to database', async () => {
    const mockLorawanMessage = {
      cmd: 'cq',
      page: 0,
      perPage: 10,
      total: 1,
      cache: [
        {
          cmd: 'rx',
          EUI: '0004A30B001C0B0C',
          ts: 123456789,
          fcnt: 1,
          port: 1,
          ack: false,
          bat: 255,
          data: '00DE013B038E',
        },
        {
          cmd: 'rx',
          EUI: '0004A30B001C0B0C',
          ts: 123456789,
          fcnt: 1,
          port: 1,
          ack: false,
          bat: 255,
          data: '00DE013B038Z',
        },
      ],
    }

    await handleMessageEvent(mockLorawanMessage)
    const graphData = await prisma.graphData.findMany({ orderBy: { value: 'asc' } })
    expect(graphData.length).toEqual(3)

    expect(graphData[0].value).toEqual(31.5)
    expect(graphData[1].value).toEqual(222)
    expect(graphData[2].value).toEqual(910)
    expect(graphData[0].dateEpoch).toEqual(Math.round(123456789 / 1000))
  })
})
