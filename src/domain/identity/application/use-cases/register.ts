import { User } from '../../enterprise/entities/user'
import type { HashGenerator } from '../cryptography/hash-generator'
import type { UserRepository } from '../repositories/user-repository'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const userAlreadyExists = await this.userRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const passwordHashed = await this.hashGenerator.hash(password)

    const user = User.create({
      name,
      email,
      password: passwordHashed,
    })

    await this.userRepository.create(user)
  }
}
