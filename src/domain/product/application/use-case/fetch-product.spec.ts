import { makeProduct } from 'test/factories/make-product'
import { FetchProductUseCase } from './fetch-product'
import { InMemoryProductRepository } from 'test/repositories/in-memory-product-repository'

let inMemoryProductRepository: InMemoryProductRepository
let sut: FetchProductUseCase

describe('fetch Product', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository()
    sut = new FetchProductUseCase(inMemoryProductRepository)
  })

  it('should be able to fetch product', async () => {
    await inMemoryProductRepository.create(
      makeProduct({ createdAt: new Date(2022, 0, 20) }),
    )
    await inMemoryProductRepository.create(
      makeProduct({ createdAt: new Date(2022, 0, 18) }),
    )
    await inMemoryProductRepository.create(
      makeProduct({ createdAt: new Date(2022, 0, 23) }),
    )

    const result = await sut.execute({ page: 1, limit: 20 })

    expect(result.value?.product).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ])
  })
})
