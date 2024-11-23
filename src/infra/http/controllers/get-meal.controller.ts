import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  UnauthorizedException,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ResourceNotFoundError } from '@/core/erros/resource-not-found-error'
import { NotAllowedError } from '@/core/erros/not-allowed-error'
import { GetMealUseCase } from '@/domain/meal/application/use-cases/get-meal'

@Controller('/meals/:mealId')
export class GetMealController {
  constructor(private getMealUseCase: GetMealUseCase) {}

  @Get()
  async handle(
    @Param('mealId') mealId: string,
    @CurrentUser() user: UserPayload,
  ) {
    const userId = user.sub

    try {
      const { meal } = await this.getMealUseCase.execute({ mealId, userId })

      return {
        meal,
      }
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        throw new NotFoundException(error.message)
      } else if (error instanceof NotAllowedError) {
        throw new UnauthorizedException(error.message)
      } else {
        throw new BadRequestException(error.message)
      }
    }
  }
}
