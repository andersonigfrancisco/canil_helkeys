import { User } from '@/domain/users/enterprise/entities/user'
import { UserRepository } from '@/domain/users/application/repositories/user-repository'

interface UserUseCaseRequest {
  UserName: string
  UserPassword: string
  UserEmail: string
}

interface UserUseCaseResponse {
  user: User
}

export class UserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    UserName,
    UserEmail,
    UserPassword,
  }: UserUseCaseRequest): Promise<UserUseCaseResponse> {
    const user = User.create({
      email: UserEmail,
      name: UserName,
      password: UserPassword,
    })

    await this.userRepository.create(user)

    return { user }
  }
}
