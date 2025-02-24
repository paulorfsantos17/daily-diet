import { AggregateRoot } from 'src/core/entities/aggregate-root'

interface UserMetricsMealsProps {
  userId: string
  totalMeals: number
  mealsWithinDiet: number
  mealsOutOfDiet: number
  bestDietSequence: number
  percentageMealsWithinDiet: number
}

export class UserMetricsByMeals extends AggregateRoot<UserMetricsMealsProps> {
  get userId(): string {
    return this.props.userId
  }

  get totalMeals(): number {
    return this.props.totalMeals
  }

  get mealsWithinDiet(): number {
    return this.props.mealsWithinDiet
  }

  get mealsOutOfDiet(): number {
    return this.props.mealsOutOfDiet
  }

  get bestDietSequence(): number {
    return this.props.bestDietSequence
  }

  get percentageMealsWithinDiet(): number {
    return this.props.percentageMealsWithinDiet
  }

  static create(props: UserMetricsMealsProps, id?: string) {
    const userMetricsMeals = new UserMetricsByMeals(props, id)
    return userMetricsMeals
  }
}
