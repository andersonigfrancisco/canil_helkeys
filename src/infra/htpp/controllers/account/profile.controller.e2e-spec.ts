import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.services'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('user get profile (E2E)', () => {
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

  test('[POST] /profile', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'userteste',
        email: 'userteste@gmail.com',
        password: 'testesenha',
      },
    })

    const acessToken = jwt.sign({ sub: user.id, name: user.name })

    console.log(acessToken)

    const response = await request(app.getHttpServer())
      .get('/profile')
      .set('Authorization', `Bearer ${acessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
  })
})
