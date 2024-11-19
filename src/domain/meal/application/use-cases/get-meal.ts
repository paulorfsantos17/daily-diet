import { ResourceNotFoundError } from '@/core/erros/resource-not-found-error'
import { Meal } from '../../enterprise/meal'
import { MealRepository } from '../repositories/meal-repository'

interface GetMealUseCaseRequest {
  mealId: string
}

interface GetMealUseCaseResponse {
  meal: Meal
}

export class GetMealUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute({
    mealId,
  }: GetMealUseCaseRequest): Promise<GetMealUseCaseResponse> {
    const meal = await this.mealRepository.findById(mealId)

    if (!meal) {
      throw new ResourceNotFoundError()
    }

    return {
      meal,
    }
  }
}
