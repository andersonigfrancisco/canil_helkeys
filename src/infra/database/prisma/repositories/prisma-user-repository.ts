import { User } from '@/domain/users/enterprise/entities/user'
import { UserRepository } from '@/domain/users/application/repositories/user-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.services'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'

@Injectable()
export class PrismaUsersRepository implements UserRepository {
  constructor(private prismaService: PrismaService) {}

  async create(user: User): Promise<User | null> {
    const data = PrismaUserMapper.toPersisten(user)
    const usertData = await this.prismaService.user.create({
      data,
    })
    return PrismaUserMapper.toDomain(usertData)
  }
}
