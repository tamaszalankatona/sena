import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'User email',
  })
  @IsEmail()
  declare email: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'User name',
  })
  @IsString()
  @Length(3, 20)
  declare username: string;

  @ApiProperty({
    example: '********',
    description: 'User password',
  })
  @IsString()
  @Length(6)
  declare password: string;

  @ApiProperty({
    example: 1250.75,
    description:
      'The current balance of the user, representing total available funds',
  })
  declare balance: number;
}
