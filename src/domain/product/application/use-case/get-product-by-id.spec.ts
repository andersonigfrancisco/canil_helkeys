import { makeProduct } from 'test/factories/make-product'
import { GetByIdProductUseCase } from './get-product-by-id'
import { InMemoryProductRepository } from 'test/repositories/in-memory-product-repository'
// import { FetchProductUseCase } from './fetch-product'
// import { PrismaProductRepository } from '@/Drivers/repositories/prisma/prisma-product-repository'

let inMemoryProductRepository: InMemoryProductRepository
// let prismaProductRepository: PrismaProductRepository
let sut: GetByIdProductUseCase
// let _sut: FetchProductUseCase

describe('get Product', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository()
    sut = new GetByIdProductUseCase(inMemoryProductRepository)
    // _sut = new FetchProductUseCase(prismaProductRepository)
  })

  it('should be able to create product', async () => {
    const newProduct = makeProduct({})

    await inMemoryProductRepository.create(newProduct)

    const product = await sut.execute({
      productId: newProduct.id.toString(),
    })

    // const { value } = await _sut.execute({ limit: 10, page: 1 })

    // console.log(value?.product)

    expect(product).toBeTruthy()
    expect(inMemoryProductRepository.items[0].id).toEqual(newProduct.id)
  })
})
