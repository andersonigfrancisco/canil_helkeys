// import { Product } from '../../enterprise/entities/Product'
import { Either, rigth } from '@/cors/either'
import { User } from '../../enterprise/entities/user'
import { UserRepository } from '../repositories/user-repository'
import { UserOutput, UserOutputMapper } from '../common/user-output'

interface GetByEmailUserUserCaseRequest {
  email: string
}

type UserUseCaseResponse = Either<null,{user: CreateUserOutput}>

export class GetByEmailUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
  }: GetByEmailUserUserCaseRequest): Promise<UserUseCaseResponse | null> {
    
    const user = await this.userRepository.findByEmail(email)

    if (!user) return null

    return rigth({
      user: UserOutputMapper.toOutput(user)
    })
  }
}

export type CreateUserOutput = UserOutput;