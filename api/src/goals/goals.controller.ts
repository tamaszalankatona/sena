import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GoalsService } from './goals.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/users/decorator/current-user.decorator';
import { GoalResponseDto } from './dto/goal-response.dto';
import { CreateGoalDto } from './dto/create-goal.dto';
import { User } from 'generated/prisma/client';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { UpdateGoalDto } from './dto/update-goal.dto';

@Controller('goals')
export class GoalsController {
  constructor(private goalsService: GoalsService) {}

  // Create a new goal
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'Goal created successfully',
    type: GoalResponseDto,
  })
  @ApiBadRequestResponse({
    description:
      'Request body does not meet requirements (e.g. missing required fields, invalid data types)',
  })
  @UseGuards(JwtAuthGuard)
  async createGoal(
    @CurrentUser() user: User,
    @Body() createGoalDto: CreateGoalDto,
  ): Promise<GoalResponseDto> {
    return await this.goalsService.createGoal(createGoalDto, user?.id);
  }

  // List all goals for the authenticated user
  @Get('all')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Goals retrieved successfully',
    type: GoalResponseDto,
  })
  @ApiBadRequestResponse({
    description:
      'Request body does not meet requirements (e.g. missing required fields, invalid data types)',
  })
  @UseGuards(JwtAuthGuard)
  async findGoals(@CurrentUser() user: User): Promise<GoalResponseDto[]> {
    return await this.goalsService.findGoals(user?.id);
  }

  // Get a specific goal by ID
  @Get(':id')
  @ApiOkResponse({
    description: 'Goal retrieved successfully',
    type: GoalResponseDto,
  })
  @ApiBadRequestResponse({
    description:
      'Request body does not meet requirements (e.g. missing required fields, invalid data types)',
  })
  @UseGuards(JwtAuthGuard)
  async findGoal(
    @CurrentUser() user: User,
    @Param('id') id: string,
  ): Promise<GoalResponseDto> {
    return await this.goalsService.findGoalById(id, user?.id);
  }

  // Update a specific goal by ID
  @Patch(':id')
  @ApiOkResponse({
    description: 'Goal updated successfully',
    type: GoalResponseDto,
  })
  @ApiBadRequestResponse({
    description:
      'Request body does not meet requirements (e.g. missing required fields, invalid data types)',
  })
  @UseGuards(JwtAuthGuard)
  async updateGoal(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() updateGoalDto: UpdateGoalDto,
  ): Promise<GoalResponseDto> {
    return this.goalsService.updateById(id, updateGoalDto, user?.id);
  }

  // Delete a specific goal by ID
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({
    description: 'Goal deleted successfully',
  })
  @ApiBadRequestResponse({
    description:
      'Request body does not meet requirements (e.g. missing required fields, invalid data types)',
  })
  @UseGuards(JwtAuthGuard)
  async deleteGoal(
    @CurrentUser() user: User,
    @Param('id') id: string,
  ): Promise<void> {
    await this.goalsService.deleteById(id, user?.id);
  }
}
