import { SetMetadata } from '@nestjs/common';
import { MetadataKeys } from '../type';

export const Authorization = (secured: boolean) =>
  SetMetadata(MetadataKeys.Secured, secured);
