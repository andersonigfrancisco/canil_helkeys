// import { Product } from '../../enterprise/entities/Product'
import { Either, left, rigth } from '@/cors/either'
import { Product } from '../../enterprise/entities/Product'
import { ProductRepository } from '../repositories/product-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface EditProductUserCaseRequeste {
  productId: string
  productName: string
  productDescription: string
  productPrice: number
  productCategory: string
}

type ProductUserCaseResponse = Either<
  ResourceNotFoundError,
  { product: Product }
>

export class EdirProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    productId,
    productName,
    productCategory,
    productDescription,
    productPrice,
  }: EditProductUserCaseRequeste): Promise<ProductUserCaseResponse> {
    const product = await this.productRepository.findById(productId)

    if (!product) {
      return left(new ResourceNotFoundError())
    }
    product.category = productCategory
    product.name = productName
    product.description = productDescription
    product.price = productPrice

    await this.productRepository.save(product)

    return rigth({
      product,
    })
  }
}
