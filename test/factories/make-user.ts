import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/cors/unique-entity-id'
import { CreateUserDTO } from '@/domain/product/shared/user-dtos'
import { User } from '@/domain/users/enterprise/entities/user'

export function makeUser(
  override: Partial<CreateUserDTO> = {},
  id?: UniqueEntityId,
) {
  const product = User.create(
    {
      name: faker.person.fullName(),
      email: faker.person.firstName()+"@gmail.com",
      password: faker.person.lastName(),
      ...override,
    },
    id,
  )
  return product
}
