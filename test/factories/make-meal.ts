import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Meal, MealProps } from '@/domain/meal/enterprise/entities/meal'

import { faker } from '@faker-js/faker'

export function makeMeal(
  override: Partial<MealProps> = {},
  id?: UniqueEntityId,
) {
  const meal = Meal.create(
    {
      name: faker.food.meat(),
      description: faker.lorem.sentence(),
      date: new Date(),
      isOnDiet: true,
      userId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return meal
}
