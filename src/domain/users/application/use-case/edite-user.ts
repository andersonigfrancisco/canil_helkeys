import { Either, left, rigth } from '@/cors/either'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { User } from '../../enterprise/entities/user'
import { UserRepository } from '../repositories/user-repository'
import { hash } from 'bcryptjs'
import { CreateUserDTO } from '@/domain/product/shared/user-dtos'

interface EditUserUseCaseRequest {
  userId: string
  userName?: string
  userEmail?: string
  userPassword?: string
  userRole?: string
}

type ProductUserCaseResponse = Either<
  ResourceNotFoundError,
  { user: User }
>

export class EditUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
    userName,
    userEmail,
    userPassword,
    userRole,
  }: EditUserUseCaseRequest): Promise<ProductUserCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const updates: Partial<CreateUserDTO> = {
      name: userName,
      email: userEmail,
      password: userPassword ? await hash(userPassword, 8) : undefined,
      role: userRole,
    }

    User.update(user, updates)

    await this.userRepository.save(user)

    return rigth({
      user,
    })
  }
}
