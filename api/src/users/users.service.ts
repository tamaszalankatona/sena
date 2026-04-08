import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'generated/prisma/client';
import { hashPassword } from 'src/utils/hash-password.utils';

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

  //find user by email
  async findUserByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new NotFoundException(
        'No user found with the provided email address',
      );
    }

    return user;
  }
}
