// import { Product } from '../../enterprise/entities/Product'
import { Either, rigth } from '@/cors/either'
import { Product } from '../../enterprise/entities/Product'
import { ProductRepository } from '../repositories/product-repository'

interface GetByIdProductUserCaseRequeste {
  productId: string
}

type ProductUserCaseResponse = Either<null, { product: Product }>

export class GetByIdProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    productId,
  }: GetByIdProductUserCaseRequeste): Promise<ProductUserCaseResponse | null> {
    const product = await this.productRepository.findById(productId)

    if (!product) {
      return null
    }

    return rigth({
      product,
    })
  }
}
