import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/htpp/pipes/zod-validation-pipe'
import { NestUserUseCase } from '@/infra/nest-use-case/neste-create-user-use-case'
import { hash } from 'bcryptjs'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
@UsePipes(new ZodValidationPipe(createAccountBodySchema))
export class CreateAccountController {
  constructor(private nestUserUseCase: NestUserUseCase) {}

  @Post()
  async handle(@Body() body: CreateAccountBodySchema): Promise<unknown> {
    const { name, email, password } = body

    const hashPassword = await hash(password, 8)

    const data = await this.nestUserUseCase.execute({
      UserEmail: email,
      UserName: name,
      UserPassword: hashPassword,
    })

    return data.user
  }
}
