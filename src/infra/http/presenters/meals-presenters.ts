import type { Meal } from '@/domain/meal/enterprise/entities/meal'

export class MealsPresenters {
  static toHTTP(meal: Meal) {
    return {
      id: meal.id.toString(),
      name: meal.name,
      description: meal.description,
      date: meal.date,
      isOnDiet: meal.isOnDiet,
      userId: meal.userId.toString(),
    }
  }
}
