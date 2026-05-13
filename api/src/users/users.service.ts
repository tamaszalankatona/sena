import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'generated/prisma/client';
import { hashPassword } from 'src/utils/hash-password.utils';
import { SensitiveUserDto } from './dto/sensitive-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UpdateUserDetailsDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (user) {
      throw new ConflictException('User with this email already exists');
    }

    const { password, ...userData } = createUserDto;
    const hashedPassword = await hashPassword(password);

    return await this.prismaService.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });
  }

  // get me endpoint to get the user data of the currently authenticated user
  async getMe(userId: string): Promise<UserResponseDto | null> {
    return await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  //find user by email
  async findUserByEmail(email: string): Promise<SensitiveUserDto> {
    const user = await this.prismaService.user.findFirst({
      where: { email },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    if (!user)
      throw new NotFoundException(
        'No user found with the provided email address',
      );

    return user;
  }

  // update current user's profile (e.g. name, email, password)
  async updateMe(
    userId: string,
    updateUserDto: UpdateUserDetailsDto,
  ): Promise<UserResponseDto> {
    return await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        ...updateUserDto,
      },
    });
  }

  // delete current user's account
  async deleteMe(userId: string): Promise<void> {
    await this.prismaService.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
