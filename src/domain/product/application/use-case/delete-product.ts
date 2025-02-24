// import { Product } from '../../enterprise/entities/Product'
import { Either, left, rigth } from '@/cors/either'
import { ProductRepository } from '../repositories/product-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface DeleteProductUserCaseRequeste {
  productId: string
}

type ProductUserCaseResponse = Either<ResourceNotFoundError, null>

export class DeleteProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    productId,
  }: DeleteProductUserCaseRequeste): Promise<ProductUserCaseResponse> {
    const product = await this.productRepository.findById(productId)

    if (!product) {
      return left(new ResourceNotFoundError())
    }
    await this.productRepository.delete(product)

    return rigth(null)
  }
}
