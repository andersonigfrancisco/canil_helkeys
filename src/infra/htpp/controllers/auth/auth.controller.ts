import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'
import { ZodValidationPipe } from '@/infra/htpp/pipes/zod-validation-pipe'
import { PrismaService } from '@/infra/database/prisma/prisma.services'
import { z } from 'zod'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/session')
@UsePipes(new ZodValidationPipe(authenticateBodySchema))
export class AuthenticateController {
  constructor(
    private prismaService: PrismaService,
    private jwt: JwtService,
  ) {}

  @Post()
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body

    const user = await this.prismaService.user.findUnique({
      where: { email },
    })
    if (!user) {
      throw new UnauthorizedException('User credential do not macht.')
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('User credential do not macht.')
    }
    const accessToken = this.jwt.sign({ sub: user.id, name: user.name })
    return {
      access_token: accessToken,
    }
  }
}
