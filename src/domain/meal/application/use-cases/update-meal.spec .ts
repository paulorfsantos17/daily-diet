import { InMemoryMealRepository } from 'test/repositories/meal-in-memory-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { UpdateMealUseCase } from './update-meal'
import { makeMeal } from 'test/factories/make-meal'

let sut: UpdateMealUseCase
let mealRepository: InMemoryMealRepository
describe('update a meal', () => {
  beforeEach(() => {
    mealRepository = new InMemoryMealRepository()
    sut = new UpdateMealUseCase(mealRepository)
  })

  it('should update a meal on exist', async () => {
    mealRepository.items.push(makeMeal(_, new UniqueEntityId('1')))

    sut.execute({
      date: new Date(),
      description: 'new description',
      isDiet: true,
      mealId: '1',
      name: 'name',
      userId: '1',
    })

    expect(mealRepository.items).toHaveLength(1)
  })
})
