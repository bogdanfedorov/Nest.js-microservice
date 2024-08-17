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
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('AUTH_SERVICE_HOST'),
            port: Number(configService.get('AUTH_SERVICE_PORT')),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
