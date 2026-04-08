import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'User email',
  })
  @IsEmail()
  declare email: string;

  @ApiProperty({
    example: '********',
    description: 'User password',
  })
  @IsString()
  @Length(6)
  declare password: string;
}
