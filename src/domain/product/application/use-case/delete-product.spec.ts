import { makeProduct } from 'test/factories/make-product'

import { InMemoryProductRepository } from 'test/repositories/in-memory-product-repository'
import { DeleteProductUseCase } from './delete-product'
import { UniqueEntityId } from '@/cors/unique-entity-id'

let inMemoryProductRepository: InMemoryProductRepository
let sut: DeleteProductUseCase

describe('delete Product By Id', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository()
    sut = new DeleteProductUseCase(inMemoryProductRepository)
  })

  it('should be able to delete By Id Product', async () => {
    const newProduct = makeProduct({}, new UniqueEntityId('product-1'))

    await inMemoryProductRepository.create(newProduct)

    await sut.execute({
      productId: 'product-1',
    })

    expect(inMemoryProductRepository.items).toHaveLength(0)
  })
})
