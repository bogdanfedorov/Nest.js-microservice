import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';
import { TokenPayload } from 'src/dto/auth.dto';

@Injectable()
export class RedisService {
  constructor(@Inject() private readonly configService: ConfigService) {}

  async cacheToken(tokenKey: string, payload: TokenPayload) {
    const redisClient = await createClient({
      url: this.configService.get<string>('REDIS_URL'),
    })
      .on('error', (err) => console.log('Redis Client Error', err))
      .connect();

    const timeNow = Math.floor(new Date().getTime() / 1000);
    const validityDuration = payload.exp - timeNow;
    if (validityDuration > 1) {
      await redisClient.set(tokenKey, JSON.stringify(payload), {
        EX: validityDuration,
      });
    }
  }

  async isTokenValid(tokenKey: string): Promise<TokenPayload> {
    const redisClient = await createClient({
      url: this.configService.get<string>('REDIS_URL'),
    })
      .on('error', (err) => console.log('Redis Client Error', err))
      .connect();

    const jsonPayload = await redisClient.get(tokenKey);

    if (!jsonPayload) {
      throw new Error('Missing token in redis');
    }

    return JSON.parse(jsonPayload) as TokenPayload;
  }
}
