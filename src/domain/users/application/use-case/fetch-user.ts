import { Either, rigth } from '@/cors/either'
import { UserRepository } from '../repositories/user-repository'
import { UserOutput, UserOutputMapper } from '../common/user-output'

interface FetchProductUserCaseRequest {
  page: number
  limit: number
}

type UserUseCaseResponse = Either<null,{user: CreateUserOutput[]}>

export class FetchUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    page,
    limit,
  }: FetchProductUserCaseRequest): Promise<UserUseCaseResponse> {
    const user = await this.userRepository.findMany({ page, limit })

    return rigth({
      user: user.map(UserOutputMapper.toOutput)
    })
  }
}

export type CreateUserOutput = UserOutput;