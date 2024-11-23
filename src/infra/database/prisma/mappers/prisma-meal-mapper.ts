import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Meal } from '@/domain/meal/enterprise/entities/meal'
import { Prisma, Meal as PrismaMeal } from '@prisma/client'

export class PrismaMealMapper {
  static toDomain(raw: PrismaMeal): Meal {
    return Meal.create(
      {
        name: raw.name,
        date: raw.date,
        description: raw.description,
        isOnDiet: raw.isOnDiet,
        userId: new UniqueEntityId(raw.userId),
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(meal: Meal): Prisma.MealUncheckedCreateInput {
    return {
      id: meal.id.toString(),
      name: meal.name,
      date: meal.date,
      description: meal.description,
      isOnDiet: meal.isOnDiet,
      userId: meal.userId.toString(),
    }
  }
}
