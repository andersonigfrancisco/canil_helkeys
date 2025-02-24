// import { Product } from '../../enterprise/entities/Product'
import { Either, rigth } from '@/cors/either'
import { Product } from '../../enterprise/entities/Product'
import { ProductRepository } from '../repositories/product-repository'

interface FetchProductUserCaseRequeste {
  page: number
  limit: number
}

type ProductUserCaseResponse = Either<null, { product: Product[] }>

export class FetchProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    page,
    limit,
  }: FetchProductUserCaseRequeste): Promise<ProductUserCaseResponse> {
    const product = await this.productRepository.findMany({ page, limit })

    return rigth({
      product,
    })
  }
}
