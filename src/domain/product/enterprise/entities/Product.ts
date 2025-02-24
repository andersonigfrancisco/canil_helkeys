import { Entity } from '@/cors/entity'
import { Optional } from '@/cors/types/optional'
import { UniqueEntityId } from '@/cors/unique-entity-id'
import { CreateProductDTO } from '@/domain/product/shared/product-dtos'

export class Product extends Entity<CreateProductDTO> {
  get category() {
    return this.props.category
  }

  get name() {
    return this.props.name
  }

  get price() {
    return this.props.price
  }

  get description() {
    return this.props.description
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

  set category(acategory: string) {
    this.props.category = acategory
    this.touch()
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  set description(description: string) {
    this.props.description = description
    this.touch()
  }

  set price(price: number) {
    this.props.price = price
    this.touch()
  }

  static create(
    props: Optional<CreateProductDTO, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const data = new Product(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    return data
  }
}
