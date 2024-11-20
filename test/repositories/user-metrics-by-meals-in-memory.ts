import type { Meal } from '@/domain/meal/enterprise/entities/meal'
import type {
  getMetricsByMealsResponse,
  UserMetricsByMealsRepository,
} from '@/domain/metrics/application/repositories/user-metrics-by-meals-repository'

export class UserMetricsMealsRepositoryInMemory
  implements UserMetricsByMealsRepository
{
  public items: Meal[] = []
  async getMetricsByMeals(userId: string): Promise<getMetricsByMealsResponse> {
    const meals = this.items.filter((item) => item.userId.toValue() === userId)
    const totalMeals = meals.length

    const mealsOutOfDiet = this.items.filter(
      (item) => item.userId.toString() === userId && item.isOnDiet === false,
    ).length

    const mealsWithinDiet = this.items.filter((item) => {
      return item.userId.toString() === userId && item.isOnDiet === true
    }).length

    const mealsOrderByDate = meals.sort(
      (a, b) => a.date.getTime() - b.date.getTime(),
    )

    return {
      totalMeals,
      mealsOutOfDiet,
      mealsWithinDiet,
      mealsOrderByDate,
    }
  }
}
