import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { UserAlreadyExistError } from '@/domain/identity/application/use-cases/errors/user-already-exists-error'
import { CreateMealUseCase } from '@/domain/meal/application/use-cases/create-meal'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

const createMealBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  date: z.string().datetime(),
  isDiet: z.boolean(),
})

type CreateMealBodySchema = z.infer<typeof createMealBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createMealBodySchema)

@Controller('/meals')
export class CreateMealController {
  constructor(private createMealUseCase: CreateMealUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(
    @Body(bodyValidationPipe) body: CreateMealBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { name, date, description, isDiet } = body
    const userId = user.sub
    const dateConvert = new Date(date)

    try {
      await this.createMealUseCase.execute({
        name,
        date: dateConvert,
        description,
        isDiet,
        userId,
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
