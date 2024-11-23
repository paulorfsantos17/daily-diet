import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Get Metrics User By Meals (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })
  it('[GET] /metrics', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: '123456',
      },
    })

    await prisma.meal.createMany({
      data: [
        {
          name: 'Almoço',
          description: 'Almoço de hoje',
          isOnDiet: true,
          date: new Date(2024, 10, 2023, 8, 0, 0).toISOString(),
          userId: user.id,
        },
        {
          name: 'Janta',
          description: 'Almoço de hoje',
          isOnDiet: false,
          date: new Date(2024, 10, 2023, 10, 0, 0).toISOString(),
          userId: user.id,
        },
        {
          name: 'Janta',
          description: 'Almoço de hoje',
          isOnDiet: true,
          date: new Date(2024, 10, 2023, 12, 0, 0).toISOString(),
          userId: user.id,
        },
        {
          name: 'Janta',
          description: 'Almoço de hoje',
          isOnDiet: true,
          date: new Date(2024, 10, 2023, 18, 0, 0).toISOString(),
          userId: user.id,
        },
      ],
    })

    const accessToken = jwt.sign({ sub: user.id })

    const response = await request(app.getHttpServer())
      .get(`/metrics`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        metrics: expect.objectContaining({
          props: expect.objectContaining({
            totalMeals: 4,
            mealsWithinDiet: 3,
            mealsOutOfDiet: 1,
            bestDietSequence: 2,
          }),
        }),
      }),
    )
  })
})
