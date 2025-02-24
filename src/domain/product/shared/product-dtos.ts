import { UniqueEntityId } from '@/cors/unique-entity-id'

export interface CreateProductDTO {
  id?: UniqueEntityId
  name: string
  description: string
  price: number
  category: string
  createdAt: Date
  updatedAt?: Date
}

export interface ProductDTO extends CreateProductDTO {
  id: UniqueEntityId
}
