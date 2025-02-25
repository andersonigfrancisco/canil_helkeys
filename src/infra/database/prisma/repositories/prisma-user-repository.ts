import { User } from '@/domain/users/enterprise/entities/user'
import { UserRepository } from '@/domain/users/application/repositories/user-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.services'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'
import { PaginationParams } from '@/cors/repositories/pagination-params'

@Injectable()
export class PrismaUsersRepository implements UserRepository {

  constructor(private prismaService: PrismaService) {}

  async create(user: User): Promise<User | null> {
    const data = PrismaUserMapper.toPersisten(user)
    const userData = await this.prismaService.user.create({
      data,
    })
    return PrismaUserMapper.toDomain(userData)
  }

 
  async findById(id: string): Promise<User | null> {
  const data =  await this.prismaService.user.findUnique({where: {id}})
  if (!data) return null
  return  PrismaUserMapper.toDomain(data)
  }
  async findByEmail(email: string): Promise<User | null> {
    const data =  await this.prismaService.user.findUnique({where: {email}})
    if (!data) return null
    return  PrismaUserMapper.toDomain(data)
  }
  async findMany(params: PaginationParams): Promise<User[]> {
    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 10;
  
    const [data, total] = await Promise.all([
      this.prismaService.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prismaService.user.count(),
    ]);
    return data.map(PrismaUserMapper.toDomain);
  
    // return {
    //   users: data.map(PrismaUserMapper.toDomain),
    //   total,
    //   page,
    //   totalPages: Math.ceil(total / limit),
    // };
  }
  
  
  async save(user: User): Promise<void> {
    const data = PrismaUserMapper.toPersisten(user)
    await this.prismaService.user.update({where: {id: user.id.toValues()}, data})
  }
  async delete(userId: string): Promise<void> {
    await this.prismaService.user.delete({where: {id: userId}})
  }

 
}
