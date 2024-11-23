import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  UnauthorizedException,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { DeleteMealUseCase } from '@/domain/meal/application/use-cases/delete-meal'
import { ResourceNotFoundError } from '@/core/erros/resource-not-found-error'
import { NotAllowedError } from '@/core/erros/not-allowed-error'

@Controller('/meals/:mealId')
export class DeleteMealController {
  constructor(private deleteMealUseCase: DeleteMealUseCase) {}

  @Delete()
  @HttpCode(HttpStatus.OK)
  async handle(
    @Param('mealId') mealId: string,
    @CurrentUser() user: UserPayload,
  ) {
    const userId = user.sub

    try {
      await this.deleteMealUseCase.execute({ mealId, userId })
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
