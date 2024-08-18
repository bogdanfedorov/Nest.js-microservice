import { Body, Controller, Inject, Post, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { AuthCommands, LoginDto, RegisterDto } from './dto/auth.dto';
import { Authorization } from './guards';
import { Services } from './services/types';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(Services.Auth) private readonly authServiceClient: ClientProxy,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authServiceClient.send(
      { cmd: AuthCommands.Register },
      registerDto,
    );
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authServiceClient.send({ cmd: AuthCommands.Login }, loginDto);
  }

  @Post('me')
  @Authorization(true)
  async getMe(@Req() req: Request & { user: any }) {
    return req.user;
  }
}
