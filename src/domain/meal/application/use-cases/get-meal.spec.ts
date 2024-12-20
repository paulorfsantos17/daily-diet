import { InMemoryMealRepository } from 'test/repositories/meal-in-memory-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { makeMeal } from 'test/factories/make-meal'
import { GetMealUseCase } from './get-meal'
import { ResourceNotFoundError } from '@/core/erros/resource-not-found-error'
import { NotAllowedError } from '@/core/erros/not-allowed-error'

let sut: GetMealUseCase
let mealRepository: InMemoryMealRepository
describe('get a meal', () => {
  beforeEach(() => {
    mealRepository = new InMemoryMealRepository()
    sut = new GetMealUseCase(mealRepository)
  })

  it('should get meal by id', async () => {
    mealRepository.items.push(
      makeMeal(
        {
          name: 'meal-1',
          userId: new UniqueEntityId('user-1'),
        },
        new UniqueEntityId('1'),
      ),
      makeMeal({}, new UniqueEntityId('2')),
      makeMeal({}, new UniqueEntityId('3')),
    )

    const { meal } = await sut.execute({
      mealId: '1',
      userId: 'user-1',
    })

    expect(meal).toBeTruthy()
    expect(meal.name).toEqual('meal-1')
  })

  it('not should be able get meal by id not exist', async () => {
    mealRepository.items.push(
      makeMeal(
        {
          name: 'meal-1',
        },
        new UniqueEntityId('1'),
      ),
    )

    await expect(
      sut.execute({
        mealId: '2',
        userId: 'XXXXXX',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('not should be able get meal when userId is different of userId of meal', async () => {
    mealRepository.items.push(
      makeMeal(
        {
          name: 'meal-1',
          userId: new UniqueEntityId('user-1'),
        },
        new UniqueEntityId('1'),
      ),
    )

    await expect(
      sut.execute({
        mealId: '1',
        userId: 'XXXXXX',
      }),
    ).rejects.toBeInstanceOf(NotAllowedError)
  })
})
