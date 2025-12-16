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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('comments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({ summary: 'Add comment to task' })
  create(@Req() req: any, @Body() dto: CreateCommentDto) {
    return this.commentsService.create(req.user.userId, dto);
  }

  @Get('task/:taskId')
  @ApiOperation({ summary: 'List comments for task' })
  list(@Req() req: any, @Param('taskId') taskId: string) {
    return this.commentsService.listByTask(req.user.userId, taskId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update comment (author only)' })
  update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: UpdateCommentDto,
  ) {
    return this.commentsService.update(req.user.userId, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete comment (author only)' })
  remove(@Req() req: any, @Param('id') id: string) {
    return this.commentsService.remove(req.user.userId, id);
  }
}
