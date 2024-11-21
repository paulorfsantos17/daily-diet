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
import { RegisterUseCase } from '@/domain/identity/application/use-cases/register'
import { UserAlreadyExistError } from '@/domain/identity/application/use-cases/errors/user-already-exists-error'
import { Public } from '@/infra/auth/public'

const createUserBodySchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createUserBodySchema)

@Controller('/register')
export class RegisterController {
  constructor(private registerUseCase: RegisterUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Public()
  async handle(@Body(bodyValidationPipe) body: CreateUserBodySchema) {
    const { name, email, password } = body

    try {
      await this.registerUseCase.execute({ name, email, password })
    } catch (error) {
      if (error instanceof UserAlreadyExistError) {
        throw new ConflictException(error.message)
      } else {
        throw new BadRequestException(error.message)
      }
    }
  }
}
