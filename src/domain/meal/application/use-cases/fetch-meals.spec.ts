import { InMemoryMealRepository } from 'test/repositories/meal-in-memory-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { FetchMealsUseCase } from './fetch-meals'
import { makeMeal } from 'test/factories/make-meal'

let sut: FetchMealsUseCase
let mealRepository: InMemoryMealRepository
describe('fetch a meal', () => {
  beforeEach(() => {
    mealRepository = new InMemoryMealRepository()
    sut = new FetchMealsUseCase(mealRepository)
  })

  it('should fetch meals by user', async () => {
    mealRepository.items.push(
      makeMeal({ userId: new UniqueEntityId('1') }, new UniqueEntityId('1')),
      makeMeal({ userId: new UniqueEntityId('1') }, new UniqueEntityId('1')),
      makeMeal({ userId: new UniqueEntityId('2') }, new UniqueEntityId('1')),
    )

    const { meals } = await sut.execute({
      userId: '1',
    })

    expect(meals).toHaveLength(2)
    expect(mealRepository.items).toHaveLength(3)
  })
})
