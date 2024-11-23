import { PrismaService } from '../../prisma.service'
import { MealRepository } from '@/domain/meal/application/repositories/meal-repository'
import { Meal } from '@/domain/meal/enterprise/entities/meal'
import { PrismaMealMapper } from '../mappers/prisma-meal-mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaMealRepository implements MealRepository {
  constructor(private prisma: PrismaService) {}

  async create(meal: Meal): Promise<void> {
    await this.prisma.meal.create({
      data: PrismaMealMapper.toPrisma(meal),
    })
  }

  async update(meal: Meal): Promise<void> {
    await this.prisma.meal.update({
      where: {
        id: meal.id.toString(),
      },
      data: PrismaMealMapper.toPrisma(meal),
    })
  }

  async findById(id: string): Promise<Meal | null> {
    const meal = await this.prisma.meal.findUnique({
      where: {
        id,
      },
    })

    if (!meal) {
      return null
    }

    return PrismaMealMapper.toDomain(meal)
  }

  async findManyByUserId(userId: string): Promise<Meal[]> {
    const meals = await this.prisma.meal.findMany({
      where: {
        userId,
      },
    })

    return meals.map(PrismaMealMapper.toDomain)
  }

  async delete(meal: Meal): Promise<void> {
    await this.prisma.meal.delete({
      where: {
        id: meal.id.toString(),
      },
    })
  }
}
