import { ResourceNotFoundError } from '@/core/erros/resource-not-found-error'
import { Meal } from '../../enterprise/meal'
import { MealRepository } from '../repositories/meal-repository'
import { NotAllowedError } from '@/core/erros/not-allowed-error'

interface GetMealUseCaseRequest {
  mealId: string
  userId: string
}

interface GetMealUseCaseResponse {
  meal: Meal
}

export class GetMealUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute({
    mealId,
    userId,
  }: GetMealUseCaseRequest): Promise<GetMealUseCaseResponse> {
    const meal = await this.mealRepository.findById(mealId)

    if (!meal) {
      throw new ResourceNotFoundError()
    }

    if (meal.userId.toString() !== userId) {
      throw new NotAllowedError()
    }

    return {
      meal,
    }
  }
}