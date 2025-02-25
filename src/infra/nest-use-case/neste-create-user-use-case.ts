import { Injectable } from '@nestjs/common'
import { UserRepository } from '@/domain/users/application/repositories/user-repository'
import { UserUseCase } from '@/domain/users/application/use-case/user'
import { EditUserUseCase } from '@/domain/users/application/use-case/edite-user'
import { DeleteUserUseCase } from '@/domain/users/application/use-case/delete-delete'
import { GetByIdUserUseCase } from '@/domain/users/application/use-case/get-user-by-id'
import { GetByEmailUserUseCase } from '@/domain/users/application/use-case/get-user-by-email'


@Injectable()
export class UserService {
  public readonly userUseCase: UserUseCase
  public readonly editUserUseCase: EditUserUseCase
  public readonly deleteUserUseCase: DeleteUserUseCase
  public readonly getByIdUserUseCase: GetByIdUserUseCase
  public readonly getByEmailUserUseCase: GetByEmailUserUseCase

  

  constructor(private readonly userRepository: UserRepository) {
    this.userUseCase = new UserUseCase(userRepository)
    this.editUserUseCase = new EditUserUseCase(userRepository)
    this.deleteUserUseCase = new DeleteUserUseCase(userRepository)
    this.getByIdUserUseCase = new GetByIdUserUseCase(userRepository)
    this.getByEmailUserUseCase = new GetByEmailUserUseCase(userRepository)
  }
}








































// import { UserRepository } from '@/domain/users/application/repositories/user-repository'
// import { UserUseCase } from '@/domain/users/application/use-case/user'
// import { Injectable } from '@nestjs/common'

// @Injectable()
// export class NestUserUseCase extends UserUseCase {
//   constructor(userRepository: UserRepository) {
//     super(userRepository)
//   }
// }
