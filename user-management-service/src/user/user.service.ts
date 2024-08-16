import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { pbkdf2Sync } from 'node:crypto';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private configService: ConfigService,
  ) {}

  async createUser(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    const passwordHash = this.heshPassword(password);
    const newUser = new this.userModel({ username, email, passwordHash });

    return newUser.save();
  }

  async findAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findUserById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async deleteUser(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  private heshPassword(password: string): string {
    const salt = this.configService.get<string>('SALT_FOR_PASSWORD');

    return pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  }
}
