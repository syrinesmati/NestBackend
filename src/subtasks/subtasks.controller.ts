import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SubtasksService } from './subtasks.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateSubtaskDto } from './dto/create-subtask.dto';
import { UpdateSubtaskDto } from './dto/update-subtask.dto';

@ApiTags('subtasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('subtasks')
export class SubtasksController {
  constructor(private readonly subtasksService: SubtasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create subtask' })
  @ApiResponse({ status: 201, description: 'Subtask created' })
  create(@Req() req: any, @Body() dto: CreateSubtaskDto) {
    return this.subtasksService.create(req.user.userId, dto);
  }

  @Get('task/:taskId')
  @ApiOperation({ summary: 'List subtasks for task' })
  list(@Req() req: any, @Param('taskId') taskId: string) {
    return this.subtasksService.listByTask(req.user.userId, taskId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update subtask' })
  update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: UpdateSubtaskDto,
  ) {
    return this.subtasksService.update(req.user.userId, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete subtask' })
  remove(@Req() req: any, @Param('id') id: string) {
    return this.subtasksService.remove(req.user.userId, id);
  }
}
