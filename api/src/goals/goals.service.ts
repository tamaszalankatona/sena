import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GoalResponseDto } from './dto/goal-response.dto';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';

@Injectable()
export class GoalsService {
  constructor(private prismaService: PrismaService) {}

  // Create a new goal
  async createGoal(
    createGoalDto: CreateGoalDto,
    userId: string,
  ): Promise<GoalResponseDto> {
    return await this.prismaService.goals.create({
      data: {
        name: createGoalDto.name,
        amount: createGoalDto.amount,
        alreadySavedAmount: createGoalDto.alreadySavedAmount,
        icon: createGoalDto.icon,
        currency: createGoalDto.currency,
        deadline: new Date(createGoalDto.deadline),

        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  // List all goals for the authenticated user
  async findGoals(userId: string): Promise<GoalResponseDto[]> {
    return await this.prismaService.goals.findMany({
      where: {
        userId: userId,
      },
    });
  }

  // Get a specific goal by ID
  async findGoalById(id: string, userId: string): Promise<GoalResponseDto> {
    const goal = await this.prismaService.goals.findFirst({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!goal)
      throw new NotFoundException('Goal not found with the provided ID');

    return goal;
  }

  // Update a specific goal by ID
  async updateById(
    id: string,
    updateGoalDto: UpdateGoalDto,
    userId: string,
  ): Promise<GoalResponseDto> {
    const goal = await this.prismaService.goals.findFirst({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!goal)
      throw new NotFoundException('Goal not found with the provided ID');

    return await this.prismaService.goals.update({
      where: {
        id: id,
      },
      data: {
        name: updateGoalDto.name,
        amount: updateGoalDto.amount,
        alreadySavedAmount: updateGoalDto.alreadySavedAmount,
        icon: updateGoalDto.icon,
        currency: updateGoalDto.currency,
        deadline: updateGoalDto.deadline,
      },
    });
  }

  // Delete a specific goal by ID
  async deleteById(id: string, userId: string): Promise<void> {
    const goal = await this.prismaService.goals.findFirst({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!goal)
      throw new NotFoundException('Goal not found with the provided ID');

    await this.prismaService.goals.delete({
      where: {
        id: id,
      },
    });
  }
}
