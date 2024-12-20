import { Meal } from '../../enterprise/entities/meal'

export abstract class MealRepository {
  abstract create(meal: Meal): Promise<void>
  abstract update(meal: Meal): Promise<void>
  abstract findById(id: string): Promise<Meal | null>
  abstract findManyByUserId(userId: string): Promise<Meal[]>
  abstract delete(meal: Meal): Promise<void>
}
