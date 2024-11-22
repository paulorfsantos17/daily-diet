import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Register Controller (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })
  it('[POST] /register', async () => {
    const response = await request(app.getHttpServer()).post('/register').send({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '12345678',
      confirmPassword: '12345678',
    })

    expect(response.status).toBe(201)

    const userOnDataBase = await prisma.user.findUnique({
      where: { email: 'john.doe@example.com' },
    })

    expect(userOnDataBase).toBeTruthy()
  })
})
