import { UserRepository } from '@/domain/identity/application/repositories/user-repository'
import { Module } from '@nestjs/common'
import { PrismaUserRepository } from './user-repository'
import { PrismaService } from '../prisma.service'

@Module({
  providers: [
    PrismaService,
    { provide: UserRepository, useClass: PrismaUserRepository },
  ],
  exports: [UserRepository],
})
export class DatabaseModule {}
