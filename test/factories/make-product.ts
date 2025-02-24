import { faker } from '@faker-js/faker'
import {
  Product,
} from '@/domain/product/enterprise/entities/Product'
import { UniqueEntityId } from '@/cors/unique-entity-id'
import { CreateProductDTO } from '@/domain/product/shared/product-dtos'

export function makeProduct(
  override: Partial<CreateProductDTO> = {},
  id?: UniqueEntityId,
) {
  const product = Product.create(
    {
      name: faker.food.vegetable(),
      category: faker.food.meat(),
      description: faker.food.description(),
      price: 1,
      ...override,
    },
    id,
  )
  return product
}
