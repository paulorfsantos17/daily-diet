import { Injectable } from '@nestjs/common'
import { User } from '../../enterprise/entities/user'
import { HashGenerator } from '../cryptography/hash-generator'
import { UserRepository } from '../repositories/user-repository'
import { UserAlreadyExistError } from './errors/user-already-exists-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}
@Injectable()
export class RegisterUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const userAlreadyExists = await this.userRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new UserAlreadyExistError()
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
