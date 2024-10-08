import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import {
  AuthCommands,
  LoginDto,
  RegisterDto,
  DecodeTokenDto,
} from './dto/auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: AuthCommands.Register })
  async register(@Payload() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @MessagePattern({ cmd: AuthCommands.Login })
  async login(@Payload() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @MessagePattern({ cmd: AuthCommands.DecodeToken })
  async decodeToken(@Payload() validateAccessDto: DecodeTokenDto) {
    return this.authService.decodeToken(validateAccessDto);
  }
}
