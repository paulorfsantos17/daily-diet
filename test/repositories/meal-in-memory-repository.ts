import type { MealRepository } from '@/domain/meal/application/repositories/meal-repository'
import type { Meal } from '@/domain/meal/enterprise/meal'

export class InMemoryMealRepository implements MealRepository {
  public items: Meal[] = []

  async create(meal: Meal): Promise<void> {
    this.items.push(meal)
  }

  async update(meal: Meal): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id.toString() === meal.id.toString(),
    )

    if (itemIndex === -1) {
      return null
    }

    this.items[itemIndex] = meal
  }

  async findById(id: string): Promise<Meal | null> {
    const item = this.items.find((item) => item.id.toString() === id)
    return item
  }
}
