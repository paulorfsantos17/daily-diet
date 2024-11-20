import type { MetricsMeal } from '../../enterprise/metric-meals'

export interface getMetricsByMealsResponse {
  totalMeals: number
  mealsWithinDiet: number
  mealsOutOfDiet: number
  mealsOrderByDate: MetricsMeal[]
}

export abstract class UserMetricsByMealsRepository {
  abstract getMetricsByMeals(userId: string): Promise<getMetricsByMealsResponse>
}
