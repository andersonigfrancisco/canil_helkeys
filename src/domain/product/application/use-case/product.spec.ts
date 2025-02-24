// import { PrismaProductRepository } from '@/Drivers/repositories/prisma/prisma-product-repository'
import { ProductUseCase } from './product'
import { InMemoryProductRepository } from 'test/repositories/in-memory-product-repository'

let inMemoryProductRepository: InMemoryProductRepository
let sut: ProductUseCase
// let prismaProductRepository: PrismaProductRepository
// let _sut: ProductUseCase

describe('Create Product', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository()
    sut = new ProductUseCase(inMemoryProductRepository)
    // prismaProductRepository = new PrismaProductRepository()
    // _sut = new ProductUseCase(prismaProductRepository)
  })

  it('should be able to create product', async () => {
    const result = await sut.execute({
      productName: 'anderson',
      productCategory: 'teste',
      productDescription: 'teste',
      productPrice: 1,
    })

    /*
    const { isRight } = await _sut.execute({
      productName: 'anderson',
      productCategory: 'teste',
      productDescription: 'teste',
      productPrice: 100,
    })
      */

    expect(result.isRight()).toBe(true)
    expect(inMemoryProductRepository.items[0]).toEqual(result.value?.product)
  })
})
