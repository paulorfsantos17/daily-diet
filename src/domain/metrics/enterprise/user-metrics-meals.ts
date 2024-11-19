import { AggregateRoot } from 'src/core/entities/aggregate-root'

interface UserMetricsMealsProps {
  userId: string
  totalMeals: number
  mealsWithinDiet: number
  mealsOutOfDiet: number
  bestDietSequence: number
}

export class UserMetricsMeals extends AggregateRoot<UserMetricsMealsProps> {
  static create(props: UserMetricsMealsProps, id?: string) {
    const userMetricsMeals = new UserMetricsMeals(props, id)
    return userMetricsMeals
  }
}
