import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { UserResponseDto } from './dto/user-response.dto';
import { User } from 'generated/prisma/client';
import { CurrentUser } from './decorator/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SensitiveUserDto } from './dto/sensitive-user.dto';
import { UpdateUserDetailsDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // get me endpoint to get the user data of the currently authenticated user
  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'User data retrieved successfully',
    type: UserResponseDto,
  })
  @ApiUnauthorizedResponse({
    description:
      'User is not authenticated or the token is invalid (e.g. missing or malformed token)',
  })
  @UseGuards(JwtAuthGuard)
  async getMe(@CurrentUser() user: User): Promise<UserResponseDto | null> {
    return this.usersService.getMe(user.id);
  }

  // find user by email
  @Get('search')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'User data retrieved successfully',
    type: SensitiveUserDto,
  })
  @ApiNotFoundResponse({
    description: 'User with the specified email does not exist',
  })
  @ApiQuery({
    name: 'email',
    required: true,
    type: String,
    description: 'The email address to search for',
    example: 'john.doe@example.com',
  })
  @UseGuards(JwtAuthGuard)
  async findUserByEmail(
    @Query('email') email: string,
  ): Promise<SensitiveUserDto> {
    return this.usersService.findUserByEmail(email);
  }

  // update current user's profile (e.g. name, email, password)
  @Patch('me')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'User profile updated successfully',
    type: UserResponseDto,
  })
  @ApiUnauthorizedResponse({
    description:
      'User is not authenticated or the token is invalid (e.g. missing or malformed token)',
  })
  @ApiBody({
    description: 'The fields to update in the user profile from current query',
    type: UpdateUserDetailsDto,
  })
  @UseGuards(JwtAuthGuard)
  async updateMe(
    @CurrentUser() user: User,
    @Body() updateUserDto: UpdateUserDetailsDto,
  ): Promise<UserResponseDto> {
    return await this.usersService.updateMe(user.id, updateUserDto);
  }

  // delete current user's account
  @Delete('me')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'User account deleted successfully',
  })
  @ApiUnauthorizedResponse({
    description:
      'User is not authenticated or the token is invalid (e.g. missing or malformed token)',
  })
  @UseGuards(JwtAuthGuard)
  async deleteMe(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    await this.usersService.deleteMe(user.id);
    res.clearCookie('access_token');
  }
}
