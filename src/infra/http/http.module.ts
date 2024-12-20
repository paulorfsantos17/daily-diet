import { Module } from '@nestjs/common'
import { RegisterController } from './controllers/register.controller'
import { RegisterUseCase } from '@/domain/identity/application/use-cases/register'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { AuthenticateUseCase } from '@/domain/identity/application/use-cases/authenticate'
import { CreateMealUseCase } from '@/domain/meal/application/use-cases/create-meal'
import { CreateMealController } from './controllers/create-meal.controller'
import { DeleteMealController } from './controllers/delete-meal.controller'
import { DeleteMealUseCase } from '@/domain/meal/application/use-cases/delete-meal'
import { GetMealController } from './controllers/get-meal.controller'
import { GetMealUseCase } from '@/domain/meal/application/use-cases/get-meal'
import { FetchMealController } from './controllers/fetch-meals.controller'
import { FetchMealsUseCase } from '@/domain/meal/application/use-cases/fetch-meals'
import { UpdateMealController } from './controllers/update-meal.controller'
import { UpdateMealUseCase } from '@/domain/meal/application/use-cases/update-meal'
import { GetMetricsUserByMealsController } from './controllers/get-metrics-user-by-meals.controller'
import { GetMetricsUserByMealsUseCase } from '@/domain/metrics/application/use-cases/get-metrics-user-by-meals'

@Module({
  imports: [CryptographyModule, DatabaseModule],
  controllers: [
    RegisterController,
    AuthenticateController,
    CreateMealController,
    DeleteMealController,
    GetMealController,
    FetchMealController,
    UpdateMealController,
    GetMetricsUserByMealsController,
  ],
  providers: [
    RegisterUseCase,
    AuthenticateUseCase,
    CreateMealUseCase,
    DeleteMealUseCase,
    GetMealUseCase,
    FetchMealsUseCase,
    UpdateMealUseCase,
    GetMetricsUserByMealsUseCase,
  ],
})
export class HttpModule {}
