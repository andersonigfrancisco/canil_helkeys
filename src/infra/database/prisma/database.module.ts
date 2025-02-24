import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.services'
import { PrismaUsersRepository } from './repositories/prisma-user-repository'
import { PrismaProductRepository } from './repositories/prisma-product-respository'
import { UserRepository } from '@/domain/users/application/repositories/user-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUsersRepository,
    },
    PrismaService,
    PrismaUsersRepository,
    PrismaProductRepository,
  ],
  exports: [PrismaService, UserRepository, PrismaProductRepository],
})
export class DatabaseModule {}
