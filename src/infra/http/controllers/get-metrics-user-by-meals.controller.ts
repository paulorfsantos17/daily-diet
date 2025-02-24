import { BadRequestException, Controller, Get } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { GetMetricsUserByMealsUseCase } from '@/domain/metrics/application/use-cases/get-metrics-user-by-meals'
import { MetricsPresenters } from '../presenters/metrics-presenters'

@Controller('/metrics')
export class GetMetricsUserByMealsController {
  constructor(
    private getMetricsUserByMealsUseCase: GetMetricsUserByMealsUseCase,
  ) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const userId = user.sub

    try {
      const { metrics } = await this.getMetricsUserByMealsUseCase.execute({
        userId,
      })

      return {
        metrics: MetricsPresenters.toHTTP(metrics),
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
