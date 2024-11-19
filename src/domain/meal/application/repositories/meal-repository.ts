import type { Meal } from '../../enterprise/meal'

export abstract class MealRepository {
  abstract create(meal: Meal): Promise<void>
  abstract update(meal: Meal): Promise<void>
  abstract findById(id: string): Promise<Meal | null>
  abstract findManyByUserId(userId: string): Promise<Meal[]>
}
