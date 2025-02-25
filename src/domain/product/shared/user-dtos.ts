import { UniqueEntityId } from '@/cors/unique-entity-id'

export interface CreateUserDTO {
  id?: UniqueEntityId
  name: string
  password: string
  email: string
  role: string
  createdAt: Date
  updatedAt?: Date | null
}

export interface UserDTO extends CreateUserDTO {
  id: UniqueEntityId
}
