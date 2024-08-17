import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { pbkdf2Sync, randomBytes } from 'node:crypto';

export type UserCredentialsDocument = UserCredentials & Document;

@Schema({
  versionKey: false,
  toJSON: {
    transform(_doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.salt;

      return ret;
    },
  },
})
export class UserCredentials {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  salt: string;

  @Prop({ default: 'user' })
  role: string;
}

export const UserCredentialsSchema =
  SchemaFactory.createForClass(UserCredentials);

UserCredentialsSchema.methods.validatePassword = function (
  password: string,
): boolean {
  return heshPassword(password, this.salt) === this.password;
};

UserCredentialsSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.salt = randomBytes(32).toString('hex');

  this.password = heshPassword(this.password, this.salt);

  next();
});

const heshPassword = (password: string, salt: string): string => {
  const iterations = 10000;
  const keylen = 64;
  const digest = 'sha512';

  return pbkdf2Sync(password, salt, iterations, keylen, digest).toString('hex');
};
