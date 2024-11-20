import { UserRepositoryInMemory } from 'test/repositories/user-repository-in-memory'
import { AuthenticateUseCase } from './authenticate'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { makeUser } from 'test/factories/make-user'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

let userRepository: UserRepositoryInMemory
let fakeHasher: FakeHasher
let encrypterFaker: FakeEncrypter
let sut: AuthenticateUseCase

describe('Authenticate', () => {
  beforeEach(() => {
    userRepository = new UserRepositoryInMemory()
    fakeHasher = new FakeHasher()
    encrypterFaker = new FakeEncrypter()
    sut = new AuthenticateUseCase(userRepository, fakeHasher, encrypterFaker)
  })
  it('should be able to authenticate a user', async () => {
    const user = makeUser({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    })

    userRepository.create(user)

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.accessToken).toBeTruthy()
    expect(result.accessToken).toString()
  })
  it('should be not able to  authenticate a student when password incorrect', async () => {
    const student = makeUser({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('test123'),
    })

    userRepository.create(student)

    await expect(
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(WrongCredentialsError)
  })
})
