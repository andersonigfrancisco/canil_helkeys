import { User } from '@/domain/users/enterprise/entities/user'
import { UserRepository } from '@/domain/users/application/repositories/user-repository'
import { PaginationParams } from '@/cors/repositories/pagination-params'

export class InMemoryUsersRepository implements UserRepository {
  public items: User[] = []

  async create(user: User) {
    this.items.push(user)
    return this.items[this.items.length - 1]
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id.toString() === id)
    if (!user) {
      return null
    }
    return user
  }

  async findMany({ page, limit }: PaginationParams) {
    const user = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * limit, page * limit)
    return user
  }

  async save(user: User) {
    const itemIndex = this.items.findIndex((item) => item.id === user.id)
    this.items[itemIndex] = user
  }

  async delete(user: User) {
    const itemIndex = this.items.findIndex((item) => item.id === user.id)
    this.items.splice(itemIndex, 1)
  }
}
