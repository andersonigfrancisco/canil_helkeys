import { PaginationParams } from '@/cors/repositories/pagination-params';
import { User } from '../../../users/enterprise/entities/user'

export abstract class UserRepository {
  abstract create(user: User): Promise<User | null>
  abstract findById(id: string): Promise<User | null>
  abstract findByEmail(email: string): Promise<User | null>
  abstract findMany(params: PaginationParams): Promise<User[]>
  abstract save(user: User): Promise<void>
  abstract delete(id: string): Promise<void>
}
