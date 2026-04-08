import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import {
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiBody,
  ApiOkResponse,
} from '@nestjs/swagger';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Response } from 'express';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  //Signup
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'User created successfully',
    type: UserResponseDto,
  })
  @ApiConflictResponse({
    description:
      'Request body does not meet requirements (e.g. invalid email format, password too short)',
  })
  async signUp(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return await this.usersService.createUser(createUserDto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'User signed in successfully',
    example: 'Sign in successfull',
  })
  @ApiConflictResponse({
    description:
      'Request body does not meet requirements (e.g. invalid email format, password too short)',
  })
  @ApiBody({
    type: SignInDto,
  })
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(signInDto);

    const user = await this.authService.validateUser(signInDto);
    console.log(user);

    const token = await this.authService.signIn(user);
    console.log(token);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: false, //localhost only
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      sameSite: 'strict',
    });

    return { message: 'Sign in successfull' };
  }
}
