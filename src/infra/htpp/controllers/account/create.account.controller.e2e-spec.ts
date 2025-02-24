import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.services'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('create account (E2E)', () => {
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

  test('[POST] /account', async () => {
    const response = await request(app.getHttpServer()).post('/accounts').send({
      name: 'userteste',
      email: 'userteste@gmail.com',
      password: 'testesenha',
    })

    expect(response.statusCode).toBe(201)

    const user = await prisma.user.findUnique({
      where: {
        email: 'userteste@gmail.com',
      },
    })
    expect(user).toBeTruthy()
  })
})
