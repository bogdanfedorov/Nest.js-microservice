import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { Services } from './services/types';
import { clientProxy } from './utils/clientProxy';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard, PermissionGuard } from './guards';
import { RedisService } from './services/redis.service';

@Module({
  imports: [ConfigModule],
  controllers: [AuthController],
  providers: [
    clientProxy(Services.Auth),
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
    RedisService,
  ],
})
export class AppModule {}
