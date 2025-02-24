import { BadRequestException, Controller, Get } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { FetchMealsUseCase } from '@/domain/meal/application/use-cases/fetch-meals'
import { MealsPresenters } from '../presenters/meals-presenters'

@Controller('/meals')
export class FetchMealController {
  constructor(private fetchMealsUseCase: FetchMealsUseCase) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const userId = user.sub

    try {
      const { meals } = await this.fetchMealsUseCase.execute({ userId })

      return {
        meals: meals.map(MealsPresenters.toHTTP),
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
