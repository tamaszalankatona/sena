import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDetailsDto extends PartialType(
  OmitType(CreateUserDto, ['password', 'balance'] as const),
) {}
