import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/htpp/pipes/zod-validation-pipe'
import { UserService } from '@/infra/nest-use-case/neste-create-user-use-case'
import { PasswordHasher } from '@/cors/password-hasher'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role:z.string(),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
@UsePipes(new ZodValidationPipe(createAccountBodySchema))
export class CreateAccountController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async handle(@Body() body: CreateAccountBodySchema): Promise<unknown> {
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
