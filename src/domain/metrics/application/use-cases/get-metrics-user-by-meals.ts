import type { MetricsMeal } from '../../enterprise/metric-meals'
import { UserMetricsByMeals } from '../../enterprise/user-metrics-by-meals'
import { UserMetricsByMealsRepository } from '../repositories/user-metrics-by-meals-repository'
interface GetMetricsUserByMealsUseCaseRequest {
  userId: string
}

interface GetMetricsUserByMealsUseCaseResponse {
  metrics: UserMetricsByMeals
}

export class GetMetricsUserByMealsUseCase {
  constructor(
    private userMetricsByMealsRepository: UserMetricsByMealsRepository,
  ) {}

  async execute({
    userId,
  }: GetMetricsUserByMealsUseCaseRequest): Promise<GetMetricsUserByMealsUseCaseResponse> {
    const { mealsOrderByDate, mealsOutOfDiet, mealsWithinDiet, totalMeals } =
      await this.userMetricsByMealsRepository.getMetricsByMeals(userId)

    const bestDietSequence = this.calculateBestDietSequence(mealsOrderByDate)

    const metrics = UserMetricsByMeals.create({
      totalMeals,
      bestDietSequence,
      mealsOutOfDiet,
      mealsWithinDiet,
      userId,
    })

    return {
      metrics,
    }
  }

  private calculateBestDietSequence(meals: MetricsMeal[]): number {
    let theBestSequence = 0
    let currentSequence = 0

    for (const meal of meals) {
      if (meal.isOnDiet) {
        currentSequence += 1
        if (currentSequence > theBestSequence) {
          theBestSequence = currentSequence
        }
      } else {
        currentSequence = 0
      }
    }

    return theBestSequence
  }
}
