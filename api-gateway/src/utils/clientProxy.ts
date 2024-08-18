import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Services } from 'src/services/types';

export const clientProxy = (service: Services) => ({
  provide: service,
  useFactory: (configService: ConfigService) =>
    ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: configService.get(`${service}_HOST`),
        port: Number(configService.get(`${service}_PORT`)),
      },
    }),
  inject: [ConfigService],
});
