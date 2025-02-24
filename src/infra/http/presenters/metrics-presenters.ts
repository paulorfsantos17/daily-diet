import type { UserMetricsByMeals } from '@/domain/metrics/enterprise/user-metrics-by-meals'

export class MetricsPresenters {
  static toHTTP(metric: UserMetricsByMeals) {
    return {
      id: metric.id.toString(),
      bestDietSequence: metric.bestDietSequence,
      mealsOutOfDiet: metric.mealsOutOfDiet,
      mealsWithinDiet: metric.mealsWithinDiet,
      percentageMealsWithinDiet: metric.percentageMealsWithinDiet,
      totalMeals: metric.totalMeals,
      userId: metric.userId,
    }
  }
}
