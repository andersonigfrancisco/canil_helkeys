import { Controller, Get, UseGuards } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt.auth.guard'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { PrismaService } from '@/infra/database/prisma/prisma.services'

@Controller('/profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private prismaService: PrismaService) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const userProfile = await this.prismaService.user.findUnique({
      where: { id: user.sub },
    })

    if (userProfile) {
      const user = { ...userProfile } as Partial<typeof userProfile>
      delete user.password
      return {
        user,
      }
    }

    return {
      user: null,
    }
  }
}
