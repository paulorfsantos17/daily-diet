import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JWtStrategy } from './jwt.strategy'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './jwt-auth.guard'
import { EnvService } from '../env/env.service'
import { EnvModule } from '../env/env.module'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      global: true,
      useFactory(envService: EnvService) {
        const key = envService.get('JWT_KEY')

        return {
          signOptions: { algorithm: 'HS256' },
          secret: key,
          verifyOptions: {
            algorithms: ['HS256'],
          },
        }
      },
    }),
  ],
  providers: [
    JWtStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    EnvService,
  ],
})
export class AuthModule {}
