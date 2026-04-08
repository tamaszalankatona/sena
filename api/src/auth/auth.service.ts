import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { comparePassword } from 'src/utils/hash-password.utils';
import { SignInDto } from './dto/sign-in.dto';
import { User } from 'generated/prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(signInDto: SignInDto): Promise<any> {
    const user = await this.usersService.findUserByEmail(signInDto.email);
    console.log(user);

    if (user && (await comparePassword(signInDto.password, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    throw new UnauthorizedException('User with provided cretentials not found');
  }

  async signIn(user: User): Promise<Record<string, string>> {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    // return token
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
