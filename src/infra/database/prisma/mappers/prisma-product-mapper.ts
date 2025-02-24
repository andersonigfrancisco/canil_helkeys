import { Product as PirsmaProduct, Prisma } from '@prisma/client'
import { Product } from '@/domain/product/enterprise/entities/Product'
import { UniqueEntityId } from '@/cors/unique-entity-id'

export class PrismaProductMapper {
  static toDomain(raw: PirsmaProduct): Product {
    return Product.create(
      {
        id: new UniqueEntityId(raw.id),
        category: raw.category,
        description: raw.description,
        name: raw.name,
        price: raw.price,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPersisten(product: Product): Prisma.ProductUncheckedCreateInput {
    return {
      id: product.id.toString(),
      category: product.category,
      name: product.name,
      price: product.price,
      description: product.description,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }
  }
}
