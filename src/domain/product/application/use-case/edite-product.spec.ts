import { makeProduct } from 'test/factories/make-product'

import { InMemoryProductRepository } from 'test/repositories/in-memory-product-repository'
import { EdirProductUseCase } from './edite-product'
import { UniqueEntityId } from '@/cors/unique-entity-id'

let inMemoryProductRepository: InMemoryProductRepository
let sut: EdirProductUseCase

describe('update Product By Id', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository()
    sut = new EdirProductUseCase(inMemoryProductRepository)
  })

  it('should be able to update By Id Product', async () => {
    const newProduct = makeProduct({}, new UniqueEntityId('product-1'))

    await inMemoryProductRepository.create(newProduct)

    await sut.execute({
      productId: newProduct.id.toString(),
      productCategory: 'teste',
      productDescription: 'teste',
      productName: 'teste',
      productPrice: 1,
    })

    expect(inMemoryProductRepository.items[0]).toMatchObject({
      category: 'teste',
      description: 'teste',
      name: 'teste',
      price: 1,
    })
  })
})
