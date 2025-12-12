import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AttachmentsService } from './attachments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateAttachmentDto } from './dto/create-attachment.dto';

@ApiTags('attachments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Add attachment metadata to a task' })
  @ApiResponse({ status: 201, description: 'Attachment created' })
  addAttachment(@Req() req: any, @Body() dto: CreateAttachmentDto) {
    return this.attachmentsService.addAttachment(req.user.userId, dto);
  }

  @Get('task/:taskId')
  @ApiOperation({ summary: 'List attachments for a task' })
  listByTask(@Req() req: any, @Param('taskId') taskId: string) {
    return this.attachmentsService.listByTask(req.user.userId, taskId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete attachment' })
  remove(@Req() req: any, @Param('id') id: string) {
    return this.attachmentsService.remove(req.user.userId, id);
  }
}
