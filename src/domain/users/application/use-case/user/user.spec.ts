import { UserUseCase } from './user'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

let inMemoryProductRepository: InMemoryUsersRepository
let sut: UserUseCase

describe('Create users', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryUsersRepository()
    sut = new UserUseCase(inMemoryProductRepository)
  })

  it('should be able to create users', async () => {
    const { user } = await sut.execute({
      UserName: 'anderson',
      UserEmail: 'teste',
      UserPassword: 'teste',
    })

    expect(user.id).toBeTruthy()
    expect(inMemoryProductRepository.items[0].id).toEqual(user.id)
  })
})
