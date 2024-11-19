import type { MealRepository } from "@/domain/meal/application/repositories/meal-repository";
import type { Meal } from "@/domain/meal/enterprise/meal";

export class InMemoryMealRepository implements MealRepository {
  public items : Meal[] = []

  async create(meal: Meal): Promise<void> {
      this.items.push(meal)
  }
}