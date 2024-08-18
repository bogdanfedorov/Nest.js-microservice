import { SetMetadata } from '@nestjs/common';
import { MetadataKeys } from '../type';

export const Permission = (permission: string) =>
  SetMetadata(MetadataKeys.Permission, permission);
