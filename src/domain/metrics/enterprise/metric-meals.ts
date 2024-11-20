import type { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { AggregateRoot } from 'src/core/entities/aggregate-root'

export interface MetricMealProps {
  date: Date
  isOnDiet: boolean
}

export class MetricsMeal extends AggregateRoot<MetricMealProps> {
  get date(): Date {
    return this.props.date
  }

  get isOnDiet(): boolean {
    return this.props.isOnDiet
  }

  static create(props: MetricMealProps, id?: UniqueEntityId) {
    const meal = new MetricsMeal(props, id)
    return meal
  }
}
