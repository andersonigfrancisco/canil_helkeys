import { Either, left, rigth } from '@/cors/either'
import { UserRepository } from '../repositories/user-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface DeleteProductUserCaseRequest {
  userId: string
}

type UserUserCaseResponse = Either<ResourceNotFoundError, null>

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
  }: DeleteProductUserCaseRequest): Promise<UserUserCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }
    await this.userRepository.delete(userId)

    return rigth(null)
  }
}
