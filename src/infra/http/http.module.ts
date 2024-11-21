import { Module } from '@nestjs/common'
import { RegisterController } from './controllers/register.controller'
import { RegisterUseCase } from '@/domain/identity/application/use-cases/register'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { AuthenticatedController } from './controllers/authenticated.controller'
import { AuthenticateUseCase } from '@/domain/identity/application/use-cases/authenticate'

@Module({
  imports: [CryptographyModule, DatabaseModule],
  controllers: [RegisterController, AuthenticatedController],
  providers: [RegisterUseCase, AuthenticateUseCase],
})
export class HttpModule {}
