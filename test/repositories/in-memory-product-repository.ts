import { PaginationParams } from '@/cors/repositories/pagination-params'
import { ProductRepository } from '@/domain/product/application/repositories/product-repository'
import { Product } from '@/domain/product/enterprise/entities/Product'

export class InMemoryProductRepository implements ProductRepository {
  public items: Product[] = []

  async findById(id: string): Promise<Product | null> {
    const product = this.items.find((item) => item.id.toString() === id)
    if (!product) {
      return null
    }

    return product
  }

  async create(product: Product) {
    this.items.push(product)
  }

  async findMany({ page, limit }: PaginationParams) {
    const product = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * limit, page * limit)
    return product
  }

  async save(product: Product) {
    const itemIndex = this.items.findIndex((item) => item.id === product.id)
    this.items[itemIndex] = product
  }

  async delete(product: Product) {
    const itemIndex = this.items.findIndex((item) => item.id === product.id)
    this.items.splice(itemIndex, 1)
  }
}
