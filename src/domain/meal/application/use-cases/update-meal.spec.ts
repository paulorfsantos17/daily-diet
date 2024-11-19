import { InMemoryMealRepository } from 'test/repositories/meal-in-memory-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { UpdateMealUseCase } from './update-meal'
import { makeMeal } from 'test/factories/make-meal'
import { ResourceNotFoundError } from '@/core/erros/resource-not-found-error'

let sut: UpdateMealUseCase
let mealRepository: InMemoryMealRepository
describe('update a meal', () => {
  beforeEach(() => {
    mealRepository = new InMemoryMealRepository()
    sut = new UpdateMealUseCase(mealRepository)
  })

  it('should update a meal on exist', async () => {
    mealRepository.items.push(makeMeal({}, new UniqueEntityId('1')))

    await sut.execute({
      date: new Date(),
      description: 'new description',
      isDiet: true,
      mealId: '1',
      name: 'new name',
      userId: '1',
    })

    expect(mealRepository.items).toHaveLength(1)
    expect(mealRepository.items[0].name).toEqual('new name')
    expect(mealRepository.items[0].description).toEqual('new description')
    expect(mealRepository.items[0].id).toEqual(new UniqueEntityId('1'))
  })

  it('not should be able update a meal when meal not exist', async () => {
    mealRepository.items.push(makeMeal({}, new UniqueEntityId('1')))

    await expect(
      sut.execute({
        date: new Date(),
        description: 'new description',
        isDiet: true,
        mealId: '4',
        name: 'new name',
        userId: '1',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
