import { GetByIdUserUseCase } from './get-user-by-id'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeUser } from 'test/factories/make-user'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetByIdUserUseCase

describe('get user', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new GetByIdUserUseCase(inMemoryUsersRepository)
  })

  it('should be able to create product', async () => {
    const newUser = makeUser({})

    await inMemoryUsersRepository.create(newUser)

    const user = await sut.execute({
      userId: newUser.id.toString(),
    })

    expect(user).toBeTruthy()
    expect(inMemoryUsersRepository.items[0].id).toEqual(newUser.id)
  })
})
