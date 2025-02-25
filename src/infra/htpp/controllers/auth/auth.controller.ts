import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ZodValidationPipe } from '@/infra/htpp/pipes/zod-validation-pipe'
import { UserService } from '@/infra/nest-use-case/neste-create-user-use-case'
import { PasswordHasher } from '@/cors/password-hasher'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { AuthDto,authSchema } from './dtos/auth-dto'

@Controller('/session')
@UsePipes(new ZodValidationPipe(authSchema))
export class AuthenticateController {
  constructor(
    private readonly userService: UserService,
    private jwt: JwtService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Authenticate user account' })
  @ApiResponse({ 
    status: 201, 
    description: 'The user authenticate has been successfully created',
    type: AuthDto 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Invalid credentials' 
  })
  async handle(@Body() body: AuthDto): Promise<unknown>  {

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
