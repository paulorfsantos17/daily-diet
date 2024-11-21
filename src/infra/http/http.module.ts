import { Module } from '@nestjs/common'
import { RegisterController } from './controllers/register.controller'
import { RegisterUseCase } from '@/domain/identity/application/use-cases/register'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [CryptographyModule, DatabaseModule],
  controllers: [RegisterController],
  providers: [RegisterUseCase],
})
export class HttpModule {}
