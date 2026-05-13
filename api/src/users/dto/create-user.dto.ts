import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { CreateGoalDto } from 'src/goals/dto/create-goal.dto';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({
    example: 'johndoe@example.com',
    description:
      'User email address, must be unique and in a valid email format',
  })
  @IsEmail()
  declare email: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'User name, must be between 3 and 20 characters long',
  })
  @IsString()
  @Length(3, 20)
  declare username: string;

  @ApiProperty({
    example: '********',
    description:
      'User password, must be at least 6 characters long and contain a mix of letters and numbers',
  })
  @IsString()
  @Length(6)
  declare password: string;

  @ApiProperty({
    example: 1250.75,
    description:
      'The current balance of the user, representing total available funds',
  })
  @IsNumber()
  declare balance: number;
}
