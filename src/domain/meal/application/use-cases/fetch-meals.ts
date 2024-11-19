import { Meal } from '../../enterprise/meal'
import { MealRepository } from '../repositories/meal-repository'

interface FetchMealUseCaseRequest {
  userId: string
}

interface FetchMealUseCaseResponse {
  meals: Meal[]
}

export class FetchMealsUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute({
    userId,
  }: FetchMealUseCaseRequest): Promise<FetchMealUseCaseResponse> {
    const meals = await this.mealRepository.findManyByUserId(userId)

    return {
      meals,
    }
  }
}
