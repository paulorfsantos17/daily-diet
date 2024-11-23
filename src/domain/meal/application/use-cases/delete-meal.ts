import { ResourceNotFoundError } from '@/core/erros/resource-not-found-error'
import { MealRepository } from '../repositories/meal-repository'
import { NotAllowedError } from '@/core/erros/not-allowed-error'
import { Injectable } from '@nestjs/common'

interface DeleteMealUseCaseRequest {
  mealId: string
  userId: string
}

@Injectable()
export class DeleteMealUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute({ mealId, userId }: DeleteMealUseCaseRequest) {
    const meal = await this.mealRepository.findById(mealId)

    if (!meal) {
      throw new ResourceNotFoundError()
    }

    if (meal.userId.toString() !== userId) {
      throw new NotAllowedError()
    }

    await this.mealRepository.delete(meal)
  }
}
