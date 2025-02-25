import { Either, rigth } from '@/cors/either'
import { User } from '../../enterprise/entities/user'
import { UserRepository } from '../repositories/user-repository'
import { hash } from 'bcryptjs'
import { UserOutput, UserOutputMapper } from '../common/user-output'
import { ConflictException } from '@nestjs/common'

interface UserUseCaseRequest {
  name: string
  email: string
  password: string
  role?: string
}

type UserUseCaseResponse = Either<null,{  user: CreateUserOutput}>

export class UserUseCase {

  constructor(private userRepository: UserRepository) {}
  async execute({
    name,
    password,
    email,
    role,
  }: UserUseCaseRequest): Promise<UserUseCaseResponse> {

    const userExist = await this.userRepository.findByEmail(email)

    if (userExist) throw new ConflictException('User already exists');

    const hashPassword = await hash(password, 8)
    
    const user = User.create({
      email,
      name,
      password,
      role: role ?? 'USER',
    })

    await this.userRepository.create(user)

    return rigth({
      user: UserOutputMapper.toOutput(user)
    })
  }
}

export type CreateUserOutput = UserOutput;