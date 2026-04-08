import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    example: 'u12345f6-789a-4bcd-ef01-23456789abcd',
    description: 'Unique identifier of the user',
  })
  declare id: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The full name of the user',
  })
  declare username: string;

  @ApiProperty({
    example: 'johndoe@email.com',
    description: 'The email address associated with the user account',
  })
  declare email: string;

  @ApiProperty({
    example: 1250.75,
    description:
      'The current balance of the user, representing total available funds',
  })
  declare balance: number;

  @ApiProperty({
    example: '2025-10-12T07:38:10.403Z',
    description: 'The timestamp when the user account was created',
  })
  declare createdAt: Date;

  @ApiProperty({
    example: '2025-10-12T07:38:10.403Z',
    description: 'The timestamp when the user account was last updated',
  })
  declare updatedAt: Date;
}
