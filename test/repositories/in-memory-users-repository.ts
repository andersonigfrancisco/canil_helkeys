import { User } from '@/domain/users/enterprise/entities/user'
import { UserRepository } from '@/domain/users/application/repositories/user-repository'

export class InMemoryUsersRepository implements UserRepository {
  public items: User[] = []

  async create(user: User) {
    this.items.push(user)
    return this.items[this.items.length - 1]
  }
}
