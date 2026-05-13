import { PickType } from '@nestjs/swagger';
import { UserResponseDto } from './user-response.dto';

export class SensitiveUserDto extends PickType(UserResponseDto, [
  'id',
  'username',
] as const) {}
