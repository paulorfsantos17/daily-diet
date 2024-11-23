import { UserRepository } from '@/domain/identity/application/repositories/user-repository'
import { Module } from '@nestjs/common'
import { PrismaUserRepository } from './prisma/repositories/user-repository'
import { PrismaService } from './prisma.service'
import { MealRepository } from '@/domain/meal/application/repositories/meal-repository'
import { PrismaMealRepository } from './prisma/repositories/meal-repository'

@Module({
  providers: [
    PrismaService,
    { provide: UserRepository, useClass: PrismaUserRepository },
    { provide: MealRepository, useClass: PrismaMealRepository },
  ],
  exports: [PrismaService, UserRepository, MealRepository],
})
export class DatabaseModule {}
