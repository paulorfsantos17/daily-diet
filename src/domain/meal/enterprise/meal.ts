import { AggregateRoot } from "src/core/entities/aggregate-root";

interface MealProps {
    name: string;
    description: string;
    date: Date;
    isOnDiet: boolean;
    userId: string;
}

export class  Meal extends AggregateRoot<MealProps> {
  static  create(props: MealProps, id?: string) {
    const meal = new Meal(props, id)
    return meal
  }
}