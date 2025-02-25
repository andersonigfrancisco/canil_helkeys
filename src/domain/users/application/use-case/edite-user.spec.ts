
import { UniqueEntityId } from '@/cors/unique-entity-id'
import { makeUser } from 'test/factories/make-user'
import { EditUserUseCase } from './edite-user'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

let inMemoryUserRepository: InMemoryUsersRepository
let sut: EditUserUseCase

describe('update user By Id', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository()
    sut = new EditUserUseCase(inMemoryUserRepository)
  })

  it('should be able to update By Id User', async () => {
    const newUser = makeUser({}, new UniqueEntityId('user-1'))

    await inMemoryUserRepository.create(newUser)

    await sut.execute({
      userId: newUser.id.toString(),
      userEmail: 'andersonfranciscoig@gmail.com',
      userName: 'anderson',
      userPassword: 'francisco',
      userRole: "admin",
    })

    expect(inMemoryUserRepository.items[0]).toMatchObject({
      userEmail: 'andersonfranciscoig@gmail.com',
      userName: 'anderson',
      userPassword: 'francisco',
      userRole: "admin",
    })
  })
})
