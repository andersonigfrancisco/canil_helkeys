import { FetchUserUseCase } from './fetch-user'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeUser } from 'test/factories/make-user'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: FetchUserUseCase

describe('fetch User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new FetchUserUseCase(inMemoryUsersRepository)
  })

  it('should be able to fetch User', async () => {
    await inMemoryUsersRepository.create(
      makeUser({ createdAt: new Date(2022, 0, 20) }),
    )
    await inMemoryUsersRepository.create(
      makeUser({ createdAt: new Date(2022, 0, 18) }),
    )
    await inMemoryUsersRepository.create(
      makeUser({ createdAt: new Date(2022, 0, 23) }),
    )

    const result = await sut.execute({ page: 1, limit: 20 })

    expect(result.value?.user).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ])
  })
})
