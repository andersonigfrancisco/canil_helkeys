import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ZodValidationPipe } from '@/infra/htpp/pipes/zod-validation-pipe'
import { z } from 'zod'
import { UserService } from '@/infra/nest-use-case/neste-create-user-use-case'
import { PasswordHasher } from '@/cors/password-hasher'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/session')
@UsePipes(new ZodValidationPipe(authenticateBodySchema))
export class AuthenticateController {
  constructor(
    private readonly userService: UserService,
    private jwt: JwtService,
  ) {}

  @Post()
  async handle(@Body() body: AuthenticateBodySchema) {

    const { email, password } = body

    const userResult = await this.userService.getByEmailUserUseCase.execute({email})
    if (!userResult?.value?.user) {
      throw new UnauthorizedException('User credentials do not match.')
    }

    const user = userResult.value.user
    const isPasswordValid = await PasswordHasher.comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('User credential do not mach SSS.')
    }
    const accessToken = this.jwt.sign({ sub: user.id, name: user.name,role: user.role})
    return {
      access_token: accessToken,
    }
  }
}
