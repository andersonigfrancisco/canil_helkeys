import { Entity } from '@/cors/entity'
import { Optional } from '@/cors/types/optional'
import { UniqueEntityId } from '@/cors/unique-entity-id'
import { CreateUserDTO } from '@/domain/product/shared/user-dtos'

export class User extends Entity<CreateUserDTO> {
  get name() {
    return this.props.name
  }

  get password() {
    return this.props.password
  }

  get email() {
    return this.props.email
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  set email(email: string) {
    this.props.email = email
    this.touch()
  }

  set password(password: string) {
    this.props.password = password
    this.touch()
  }

  static create(
    props: Optional<CreateUserDTO, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const user = new User(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    return user
  }
}
