import { UserRepository } from '@/domain/identity/application/repositories/user-repository'
import { Module } from '@nestjs/common'
import { PrismaUserRepository } from './prisma/repositories/user-repository'
import { PrismaService } from './prisma.service'
import { MealRepository } from '@/domain/meal/application/repositories/meal-repository'
import { PrismaMealRepository } from './prisma/repositories/meal-repository'
import { UserMetricsByMealsRepository } from '@/domain/metrics/application/repositories/user-metrics-by-meals-repository'
import { PrismaUserMetricsByMealsRepository } from './prisma/repositories/user-metrics-by-meals-repository'

@Module({
  providers: [
    PrismaService,
    { provide: UserRepository, useClass: PrismaUserRepository },
    { provide: MealRepository, useClass: PrismaMealRepository },
    {
      provide: UserMetricsByMealsRepository,
      useClass: PrismaUserMetricsByMealsRepository,
    },
  ],
  exports: [
    PrismaService,
    UserRepository,
    MealRepository,
    UserMetricsByMealsRepository,
  ],
})
export class DatabaseModule {}
