import { UserMetricsMealsRepositoryInMemory } from 'test/repositories/user-metrics-by-meals-in-memory'
import { GetMetricsUserByMealsUseCase } from './get-metrics-user-by-meals'
import { makeMeal } from 'test/factories/make-meal'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let userMetricsUserByMeals: UserMetricsMealsRepositoryInMemory
let sut: GetMetricsUserByMealsUseCase

describe('Get Metrics User By Meals', () => {
  beforeEach(() => {
    userMetricsUserByMeals = new UserMetricsMealsRepositoryInMemory()
    sut = new GetMetricsUserByMealsUseCase(userMetricsUserByMeals)
  })
  it('should get metric total meals by userId', async () => {
    userMetricsUserByMeals.items.push(
      makeMeal({ userId: new UniqueEntityId('1') }, new UniqueEntityId('1')),
      makeMeal({ userId: new UniqueEntityId('1') }, new UniqueEntityId('2')),
      makeMeal({ userId: new UniqueEntityId('2') }, new UniqueEntityId('3')),
    )

    const { metrics } = await sut.execute({ userId: '1' })

    expect(metrics.totalMeals).toEqual(2)
  })
  it('should get metric mealsWithinDiet by userId', async () => {
    userMetricsUserByMeals.items.push(
      makeMeal(
        { userId: new UniqueEntityId('1'), isOnDiet: true },
        new UniqueEntityId('1'),
      ),
      makeMeal(
        { userId: new UniqueEntityId('1'), isOnDiet: false },
        new UniqueEntityId('2'),
      ),
      makeMeal(
        { userId: new UniqueEntityId('1'), isOnDiet: true },
        new UniqueEntityId('3'),
      ),
    )

    const { metrics } = await sut.execute({ userId: '1' })

    expect(metrics.mealsWithinDiet).toEqual(2)
  })
  it('should get metric mealsWithinDiet by userId', async () => {
    userMetricsUserByMeals.items.push(
      makeMeal(
        { userId: new UniqueEntityId('1'), isOnDiet: true },
        new UniqueEntityId('1'),
      ),
      makeMeal(
        { userId: new UniqueEntityId('1'), isOnDiet: false },
        new UniqueEntityId('2'),
      ),
      makeMeal(
        { userId: new UniqueEntityId('1'), isOnDiet: true },
        new UniqueEntityId('3'),
      ),
    )

    const { metrics } = await sut.execute({ userId: '1' })

    expect(metrics.mealsOutOfDiet).toEqual(1)
  })
  it('should get metric bestDietSequence by userId', async () => {
    const date = new Date(2024, 1, 1, 13)
    vi.setSystemTime(date)

    userMetricsUserByMeals.items.push(
      makeMeal(
        {
          userId: new UniqueEntityId('1'),
          isOnDiet: true,
          date: new Date(2024, 1, 1, 15),
        },
        new UniqueEntityId('1'),
      ),
      makeMeal(
        {
          userId: new UniqueEntityId('1'),
          isOnDiet: false,
          date: new Date(2024, 1, 1, 16),
        },
        new UniqueEntityId('2'),
      ),
      makeMeal(
        {
          userId: new UniqueEntityId('1'),
          isOnDiet: true,
          date: new Date(2024, 1, 2, 15),
        },
        new UniqueEntityId('3'),
      ),
      makeMeal(
        {
          userId: new UniqueEntityId('1'),
          isOnDiet: true,
          date: new Date(2024, 1, 2, 16),
        },
        new UniqueEntityId('3'),
      ),
    )

    const { metrics } = await sut.execute({ userId: '1' })

    expect(metrics.bestDietSequence).toEqual(2)
  })
})
