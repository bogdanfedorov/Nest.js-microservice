import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { Services } from './services/types';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [ConfigModule],
  controllers: [AuthController],
  providers: [
    {
      provide: Services.Auth,
      useFactory: (configService: ConfigService) => {
        const authServiceUrl = configService.get('AUTH_SERVICE_URL');
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            port: 3001,
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
