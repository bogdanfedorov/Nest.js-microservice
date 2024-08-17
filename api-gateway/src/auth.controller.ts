import { Body, Controller, Headers, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthCommands, LoginDto, RegisterDto } from './dto/auth.dto';
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

  @Post('verefication')
  async getMe(@Headers('Authorization') token: string) {
    return this.authServiceClient.send(
      { cmd: AuthCommands.Verefication },
      token,
    );
  }
}
