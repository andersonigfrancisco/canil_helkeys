// import { Product } from '../../enterprise/entities/Product'
import { Either, rigth } from '@/cors/either'
import { User } from '../../enterprise/entities/user'
import { UserRepository } from '../repositories/user-repository'
import { UserOutput, UserOutputMapper } from '../common/user-output'

interface GetByIdUserUserCaseRequest {
  userId: string
}

type UserUseCaseResponse = Either<null,{user: CreateUserOutput}>

export class GetByIdUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
  }: GetByIdUserUserCaseRequest): Promise<UserUseCaseResponse | null> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      return null
    }

    return rigth({
      user: UserOutputMapper.toOutput(user)
    })
  }
}
export type CreateUserOutput = UserOutput;