import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Meal } from '../../enterprise/entities/meal'
import { MealRepository } from '../repositories/meal-repository'
import { Injectable } from '@nestjs/common'

interface CreateMealUseCaseRequest {
  name: string
  description: string
  date: Date
  isOnDiet: boolean
  userId: string
}
@Injectable()
export class CreateMealUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute({
    name,
    description,
    date,
    isOnDiet,
    userId,
  }: CreateMealUseCaseRequest) {
    const meal = Meal.create({
      name,
      description,
      date,
      isOnDiet,
      userId: new UniqueEntityId(userId),
    })

    await this.mealRepository.create(meal)
  }
}
