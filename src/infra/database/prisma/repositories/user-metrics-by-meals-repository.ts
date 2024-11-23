import {
  getMetricsByMealsResponse,
  UserMetricsByMealsRepository,
} from '@/domain/metrics/application/repositories/user-metrics-by-meals-repository'
import { PrismaService } from '../../prisma.service'
import { PrismaMealMapper } from '../mappers/prisma-meal-mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaUserMetricsByMealsRepository
  implements UserMetricsByMealsRepository
{
  constructor(private prisma: PrismaService) {}

  async getMetricsByMeals(userId: string): Promise<getMetricsByMealsResponse> {
    const [mealsOrderByDate, totalMeals, mealsWithinDiet, mealsOutOfDiet] =
      await Promise.all([
        this.prisma.meal.findMany({
          where: {
            userId,
          },
          orderBy: {
            date: 'desc',
          },
        }),
        this.prisma.meal.count({
          where: {
            userId,
          },
        }),
        this.prisma.meal.count({
          where: {
            userId,
            isOnDiet: true,
          },
        }),
        this.prisma.meal.count({
          where: {
            userId,
            isOnDiet: false,
          },
        }),
      ])

    return {
      mealsOrderByDate: mealsOrderByDate.map(PrismaMealMapper.toDomain),
      totalMeals,
      mealsWithinDiet,
      mealsOutOfDiet,
    }
  }
}
