import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { UserAlreadyExistError } from '@/domain/identity/application/use-cases/errors/user-already-exists-error'
import { UpdateMealUseCase } from '@/domain/meal/application/use-cases/update-meal'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

const updateMealBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  date: z.string().datetime(),
  isOnDiet: z.boolean(),
})

type UpdateMealBodySchema = z.infer<typeof updateMealBodySchema>

const bodyValidationPipe = new ZodValidationPipe(updateMealBodySchema)

@Controller('/meals/:mealId')
export class UpdateMealController {
  constructor(private updateMealUseCase: UpdateMealUseCase) {}

  @Put()
  @HttpCode(HttpStatus.OK)
  async handle(
    @Body(bodyValidationPipe) body: UpdateMealBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('mealId') mealId: string,
  ) {
    const { name, date, description, isOnDiet } = body
    const userId = user.sub
    const dateConvert = new Date(date)

    try {
      await this.updateMealUseCase.execute({
        name,
        date: dateConvert,
        description,
        isOnDiet,
        userId,
        mealId,
      })
    } catch (error) {
      if (error instanceof UserAlreadyExistError) {
        throw new ConflictException(error.message)
      } else {
        throw new BadRequestException(error.message)
      }
    }
  }
}
