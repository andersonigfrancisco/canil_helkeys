import { User as PirsmaUser, Prisma } from '@prisma/client'
import { User } from '@/domain/users/enterprise/entities/user'
import { UniqueEntityId } from '@/cors/unique-entity-id'

export class PrismaUserMapper {
  static toDomain(raw: PirsmaUser): User {
    return User.create(
      {
        email: raw.email,
        id: new UniqueEntityId(raw.id),
        name: raw.name,
        password: raw.password,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPersisten(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      email: user.email,
      name: user.name,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
