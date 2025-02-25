import { UniqueEntityId } from '@/cors/unique-entity-id'
import { DeleteUserUseCase } from './delete-delete'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeUser } from 'test/factories/make-user'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: DeleteUserUseCase

describe('delete Product By Id', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new DeleteUserUseCase(inMemoryUsersRepository)
  })

  it('should be able to delete By Id user', async () => {
    const newUser = makeUser({}, new UniqueEntityId('user-1'))

    await inMemoryUsersRepository.create(newUser)

    await sut.execute({
      userId: 'user-1',
    })

    expect(inMemoryUsersRepository.items).toHaveLength(0)
  })
})
