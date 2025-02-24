import { User } from '../../../users/enterprise/entities/user'

export abstract class UserRepository {
  abstract create(user: User): Promise<User | null>
}
