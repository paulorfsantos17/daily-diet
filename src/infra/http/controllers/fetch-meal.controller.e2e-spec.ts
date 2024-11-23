import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Fetch Meal Controller (e2e)', () => {
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
  it('[GET] /meals', async () => {
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
          date: new Date().toISOString(),
          userId: user.id,
        },
        {
          name: 'Janta',
          description: 'Almoço de hoje',
          isOnDiet: true,
          date: new Date().toISOString(),
          userId: user.id,
        },
      ],
    })

    const accessToken = jwt.sign({ sub: user.id })

    const response = await request(app.getHttpServer())
      .get(`/meals`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.status).toBe(200)
    expect(response.body.meals).toHaveLength(2)
    expect(response.body).toEqual(
      expect.objectContaining({
        meals: expect.arrayContaining([
          expect.objectContaining({
            props: expect.objectContaining({ name: 'Almoço' }),
          }),
          expect.objectContaining({
            props: expect.objectContaining({ name: 'Janta' }),
          }),
        ]),
      }),
    )
  })
})
