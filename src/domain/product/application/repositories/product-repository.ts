import { PaginationParams } from '@/cors/repositories/pagination-params'
import { Product } from '../../enterprise/entities/Product'

export abstract class ProductRepository {
  abstract findById(id: string): Promise<Product | null>
  abstract findMany(params: PaginationParams): Promise<Product[]>
  abstract create(product: Product): Promise<void>
  abstract save(product: Product): Promise<void>
  abstract delete(product: Product): Promise<void>
}
