import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

async function mockGraphData() {
  const prisma = new PrismaClient()
  const fakeUser = {
    username: 'fakeUser1',
    password: await hash('fakePassword1', 10),
  }
  await prisma.user.create({
    data: fakeUser,
  })

  const fakePlant = {
    name: 'Test plant',
    latinName: 'latino americano',
    id: 12,
    username: 'fakeUser1',
    description: 'This is the test plant',
    image:
      'https://media.istockphoto.com/id/1372896722/photo/potted-banana-plant-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=bioeNAo7zEqALK6jvyGlxeP_Y7h6j0QjuWbwY4E_eP8=',
  }
  await prisma.plant.create({
    data: fakePlant,
  })

  const fakeGraphPoints = [
    {
      plantId: 12,
      dateEpoch: Math.floor(new Date().getTime() / 1000.0),
      value: 11.2,
      type: 'temperature',
    },
    {
      plantId: 12,
      dateEpoch: Math.floor(new Date().getTime() / 1000.0) + 3000,
      value: 14.2,
      type: 'temperature',
    },
    {
      plantId: 12,
      dateEpoch: Math.floor(new Date().getTime() / 1000.0) + 6000,
      value: 41.2,
      type: 'temperature',
    },
    {
      plantId: 12,
      dateEpoch: Math.floor(new Date().getTime() / 1000.0),
      value: 9.2,
      type: 'co2',
    },
  ]

  await prisma.graphData.createMany({
    data: fakeGraphPoints,
  })
}

async function main() {
  await mockGraphData()
  console.log('data mocked')
}

main()
