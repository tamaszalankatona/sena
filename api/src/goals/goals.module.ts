import { Module } from '@nestjs/common';
import { GoalsController } from './goals.controller';
import { GoalsService } from './goals.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [GoalsController],
  providers: [GoalsService, PrismaService],
})
export class GoalsModule {}
