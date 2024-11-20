import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Meal } from '../../enterprise/entities/meal'
import { MealRepository } from '../repositories/meal-repository'

interface CreateMealUseCaseRequest {
  name: string
  description: string
  date: Date
  isDiet: boolean
  userId: string
}

export class CreateMealUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute({
    name,
    description,
    date,
    isDiet,
    userId,
  }: CreateMealUseCaseRequest) {
    const meal = Meal.create({
      name,
      description,
      date,
      isOnDiet: isDiet,
      userId: new UniqueEntityId(userId),
    })

    await this.mealRepository.create(meal)
  }
}
