import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '@/infra/auth/jwt.auth.guard'
import { UserService } from '@/infra/nest-use-case/neste-create-user-use-case'

@ApiTags('Profile')
@ApiBearerAuth()
@Controller('/profiles')
@UseGuards(JwtAuthGuard)
export class ListAccountController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false, example: 1, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, example: 10, description: 'Number of items per page' })
  @ApiResponse({ status: 200, description: 'User profile returned successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Token invalid' })
  async handle(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    //@CurrentUser() user: UserPayload
  ) {
    const userProfile = await this.userService.fetchUserUseCase.execute({ page, limit })

    if (userProfile?.value?.user) {
      const user = { ...userProfile.value.user } as { password?: string } 
      delete user.password
      return user 
    }
    return null
  }
}
