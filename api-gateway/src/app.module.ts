import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { Services } from './services/types';
import { clientProxy } from './utils/clientProxy';

@Module({
  imports: [ConfigModule],
  controllers: [AuthController],
  providers: [clientProxy(Services.Auth)],
})
export class AppModule {}
