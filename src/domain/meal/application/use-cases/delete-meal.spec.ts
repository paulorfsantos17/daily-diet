import { InMemoryMealRepository } from 'test/repositories/meal-in-memory-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { makeMeal } from 'test/factories/make-meal'
import { DeleteMealUseCase } from './delete-meal'
import { ResourceNotFoundError } from '@/core/erros/resource-not-found-error'
import { NotAllowedError } from '@/core/erros/not-allowed-error'

let sut: DeleteMealUseCase
let mealRepository: InMemoryMealRepository
describe('delete a meal', () => {
  beforeEach(() => {
    mealRepository = new InMemoryMealRepository()
    sut = new DeleteMealUseCase(mealRepository)
  })

  it('should delete meal by id', async () => {
    mealRepository.items.push(
      makeMeal(
        {
          name: 'meal-1',
          userId: new UniqueEntityId('user-1'),
        },
        new UniqueEntityId('1'),
      ),
    )

    expect(mealRepository.items).toHaveLength(1)

    await sut.execute({
      mealId: '1',
      userId: 'user-1',
    })

    expect(mealRepository.items).toHaveLength(0)
  })

  it('not should be able delete meal by id not exist', async () => {
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

  it('not should be able delete meal when userId is different of userId of meal', async () => {
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
