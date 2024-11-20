import { UserRepository } from '@/domain/identity/application/repositories/user-repository'
import { User } from '@/domain/identity/enterprise/entities/user'

export class UserRepositoryInMemory extends UserRepository {
  public items: User[] = []
  async create(user: User): Promise<void> {
    this.items.push(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }
}
