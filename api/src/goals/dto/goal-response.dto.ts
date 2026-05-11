import { ApiProperty } from '@nestjs/swagger';

import { CreateGoalDto } from './create-goal.dto';
import { IsString } from 'class-validator';

export class GoalResponseDto extends CreateGoalDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The unique identifier of the financial goal',
  })
  @IsString()
  declare id: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description:
      'The unique identifier of the user who owns the financial goal',
  })
  @IsString()
  declare userId: string;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'The date and time when the financial goal was created',
  })
  declare createdAt: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'The date and time when the financial goal was last updated',
  })
  declare updatedAt: Date;
}
