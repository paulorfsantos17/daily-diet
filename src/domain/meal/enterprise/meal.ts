import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AggregateRoot } from "src/core/entities/aggregate-root";

export interface MealProps {
    name: string
    description: string
    date: Date
    isOnDiet: boolean
    userId: UniqueEntityId
}

export class  Meal extends AggregateRoot<MealProps> {

  get name(): string {
    return this.props.name
  }

  get description(): string {
    return this.props.description
  }

  get date(): Date {
    return this.props.date
  }

  get isOnDiet(): boolean {
    return this.props.isOnDiet
  }

  get userId(): UniqueEntityId {
    return this.props.userId
  }
  
  static  create(props: MealProps, id?: UniqueEntityId ) {
    const meal = new Meal(props, id)
    return meal
  }
}