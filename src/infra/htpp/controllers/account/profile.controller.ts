import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt.auth.guard'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { UserService } from '@/infra/nest-use-case/neste-create-user-use-case'

@ApiTags('Profile')
@ApiBearerAuth()
@Controller('/profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'User profile returned successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Token inválido ou ausente' })
  async handle(@CurrentUser() user: UserPayload) {
    const userProfile = await this.userService.getByIdUserUseCase.execute({ userId: user.sub })

    if (userProfile?.value?.user) {
      const user = { ...userProfile.value.user } as { password?: string } 
      delete user.password
      return user 
    }
    return null
  }
}
