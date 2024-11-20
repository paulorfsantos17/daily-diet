import { UserRepositoryInMemory } from 'test/repositories/user-repository-in-memory'
import { RegisterUseCase } from './register'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { makeUser } from 'test/factories/make-user'

let sut: RegisterUseCase
let userRepository: UserRepositoryInMemory
let hashGenerator: FakeHasher

describe('Register Student', () => {
  beforeEach(() => {
    userRepository = new UserRepositoryInMemory()
    hashGenerator = new FakeHasher()
    sut = new RegisterUseCase(userRepository, hashGenerator)
  })
  it('should be able register user', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(userRepository.items).toHaveLength(1)
    expect(userRepository.items[0].name).toEqual('John Doe')
  })

  it('should hash student password upon register', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const hashedPassword = await hashGenerator.hash('123456')

    expect(userRepository.items[0].password).toEqual(hashedPassword)
  })

  it('not should be able register user by existing email', async () => {
    userRepository.items.push(makeUser({ email: 'johndoe@example.com' }))

    await expect(
      sut.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toThrow('User already exists')
  })
})
