import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository"
import { UserUseCase } from "./user"


let inMemoryUsersRepository: InMemoryUsersRepository
let sut: UserUseCase

describe('Create Product', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new UserUseCase(inMemoryUsersRepository)
  })

  it('should be able to create user', async () => {
    const result = await sut.execute({
      userName: 'anderson',
      userEmail: 'anderson@gmail.',
      userPassword: 'francisco123',
      userRole: 'admin',
    })


    expect(result.isRight()).toBe(true)
    expect(inMemoryUsersRepository.items[0]).toEqual(result.value?.user)
  })
})
