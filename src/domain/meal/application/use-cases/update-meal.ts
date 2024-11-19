import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Meal } from '../../enterprise/meal'
import { MealRepository } from '../repositories/meal-repository'
import { ResourceNotFoundError } from '@/core/erros/resource-not-found-error'

interface UpdateMealUseCaseRequest {
  mealId: string
  name: string
  description: string
  date: Date
  isDiet: boolean
  userId: string
}

export class UpdateMealUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute({
    mealId,
    name,
    description,
    date,
    isDiet,
    userId,
  }: UpdateMealUseCaseRequest) {
    const mealExists = await this.mealRepository.findById(mealId)

    if (!mealExists) {
      throw new ResourceNotFoundError()
    }

    const meal = Meal.create(
      {
        name,
        description,
        date,
        isOnDiet: isDiet,
        userId: new UniqueEntityId(userId),
      },
      new UniqueEntityId(mealId),
    )

    await this.mealRepository.update(meal)
  }
}
