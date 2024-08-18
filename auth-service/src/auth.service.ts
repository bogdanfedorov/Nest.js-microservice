import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  DecodeTokenDto,
  DecodeTokenResDto,
  LoginDto,
  RegisterDto,
  TokenPayload,
} from './dto/auth.dto';
import {
  UserCredentials,
  UserCredentialsDocument,
} from './schemas/userCredentials.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserCredentials.name)
    private readonly userModel: Model<UserCredentialsDocument>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto): Promise<UserCredentials> {
    const newUser = new this.userModel(registerDto);
    return newUser.save();
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.userModel.findOne({ username: loginDto.username });

    // @ts-expect-error Because typescript doesn't support methods that were added in a way other than the class signature.
    // The validatePassword method is declared.
    if (!user || !user.validatePassword(loginDto.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      username: user.username,
      userId: user._id,
      sub: user._id,
      role: user.role,
    } as TokenPayload;
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async validateUser(userId: string): Promise<UserCredentials> {
    return this.userModel.findById(userId).exec();
  }

  async decodeToken(
    validateAccess: DecodeTokenDto,
  ): Promise<DecodeTokenResDto> {
    let payload: TokenPayload;
    try {
      payload = await this.jwtService.verifyAsync<TokenPayload>(
        validateAccess.token,
        {
          secret: this.configService.get<string>('JWT_SECRET'),
        },
      );

      delete payload['iat'];
      delete payload['exp'];
      delete payload['sub'];
    } catch (e) {
      return {
        data: null,
        error: e.message,
      };
    }

    return {
      data: payload,
      error: null,
    };
  }
}
