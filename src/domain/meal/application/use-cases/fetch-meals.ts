import { Injectable } from '@nestjs/common'
import { Meal } from '../../enterprise/entities/meal'
import { MealRepository } from '../repositories/meal-repository'

interface FetchMealUseCaseRequest {
  userId: string
}

interface FetchMealUseCaseResponse {
  meals: Meal[]
}

@Injectable()
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
