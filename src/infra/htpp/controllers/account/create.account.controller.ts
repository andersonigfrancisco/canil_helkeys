import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/htpp/pipes/zod-validation-pipe'
import { UserService } from '@/infra/nest-use-case/neste-create-user-use-case'
import { PasswordHasher } from '@/cors/password-hasher'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { createAccountSchema, CreateAccountDto } from './dtos/create-account.dto'


@ApiTags('Accounts')
@Controller('/accounts')
@UsePipes(new ZodValidationPipe(createAccountSchema))
export class CreateAccountController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user account' })
  @ApiResponse({ 
    status: 201, 
    description: 'The user account has been successfully created',
    type: CreateAccountDto 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'User already exists' 
  })
  async handle(@Body() body: CreateAccountDto): Promise<unknown> {
    const { name, email, password,role } = body

    const hashPassword = await PasswordHasher.hashPassword(password);

    const data = await this.userService.userUseCase.execute({
      email,
      name,
      password: hashPassword,
      role
    })
    
    const { password: _, ...user } = data.value!.user
    return user
  }
}
