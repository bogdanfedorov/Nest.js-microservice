import { ProtoResDto } from './proto.dto';

export class RegisterDto {
  username: string;
  password: string;
}

export class LoginDto {
  username: string;
  password: string;
}

export class DecodeTokenDto {
  token: string;
}

export class TokenPayload {
  username: string;
  userId: string;
  role: string;
  iat?: number;
  exp?: number;
}

export class DecodeTokenResDto extends ProtoResDto<TokenPayload> {}

export enum AuthCommands {
  Register,
  Login,
  DecodeToken,
}
