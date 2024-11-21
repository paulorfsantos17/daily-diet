import { Module } from '@nestjs/common'
import { HttpModule } from './http/http.module'
import { AuthModule } from './auth/auth.module'
import { EnvModule } from './env/env.module'
import { envSchema } from './env/env'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    HttpModule,
    AuthModule,
    EnvModule,
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
