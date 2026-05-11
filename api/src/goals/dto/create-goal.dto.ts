import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsString, Length } from 'class-validator';
import { Currency } from 'generated/prisma/enums';

export class CreateGoalDto {
  @ApiProperty({
    example: 'Retirement Savings',
    description: 'The name of the financial goal',
  })
  @IsString()
  @Length(3, 255)
  declare name: string;

  @ApiProperty({
    example: '100000',
    description: 'The amount for the financial goal',
  })
  @IsNumber()
  @Type(() => Number)
  declare amount: number;

  @ApiProperty({
    example: '5000',
    description: 'The amount already saved towards the financial goal',
  })
  @IsNumber()
  @Type(() => Number)
  declare alreadySavedAmount: number;

  @ApiProperty({
    example: 'Savings',
    description: 'The icon representing the financial goal',
  })
  @IsString()
  declare icon: string;

  @ApiProperty({
    example: Currency.EUR,
    description: 'The currency of the financial goal',
  })
  @IsEnum(Currency)
  declare currency: Currency;

  @ApiProperty({
    example: '2026-12-31',
    description: 'The deadline for the financial goal',
  })
  @IsDate()
  declare deadline: Date;
}
