import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { UserAlreadyExistError } from '@/domain/identity/application/use-cases/errors/user-already-exists-error'
import { Public } from '@/infra/auth/public'
import { AuthenticateUseCase } from '@/domain/identity/application/use-cases/authenticate'

const authenticatedControllerBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type AuthenticatedControllerBodySchema = z.infer<
  typeof authenticatedControllerBodySchema
>

const bodyValidationPipe = new ZodValidationPipe(
  authenticatedControllerBodySchema,
)

@Controller('/auth')
export class AuthenticatedController {
  constructor(private authenticateUseCase: AuthenticateUseCase) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @Public()
  async handle(
    @Body(bodyValidationPipe) body: AuthenticatedControllerBodySchema,
  ) {
    const { email, password } = body

    try {
      const result = await this.authenticateUseCase.execute({ email, password })

      return {
        access_token: result.accessToken,
      }
    } catch (error) {
      if (error instanceof UserAlreadyExistError) {
        throw new UnauthorizedException(error.message)
      } else {
        throw new BadRequestException(error.message)
      }
    }
  }
}
