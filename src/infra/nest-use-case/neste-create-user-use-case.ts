import { UserRepository } from '@/domain/users/application/repositories/user-repository'
import { UserUseCase } from '@/domain/users/application/use-case/user/user'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestUserUseCase extends UserUseCase {
  constructor(userRepository: UserRepository) {
    super(userRepository)
  }
}
