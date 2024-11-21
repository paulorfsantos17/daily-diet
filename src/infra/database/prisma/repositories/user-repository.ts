import { UserRepository } from '@/domain/identity/application/repositories/user-repository'
import { User } from '@/domain/identity/enterprise/entities/user'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return User.create(
      {
        name: user.name,
        email: user.email,
        password: user.password,
      },
      new UniqueEntityId(user.id),
    )
  }
}
