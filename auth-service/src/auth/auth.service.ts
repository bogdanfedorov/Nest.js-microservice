import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import {
  UserCredentials,
  UserCredentialsDocument,
} from './schemas/userCredentials.schema';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserCredentials.name)
    private userModel: Model<UserCredentialsDocument>,
    private jwtService: JwtService,
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

    const payload = { username: user.username, sub: user._id, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async validateUser(userId: string): Promise<UserCredentials> {
    return this.userModel.findById(userId).exec();
  }
}
