import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SearchService } from './search.service';
import { SearchTasksDto } from './dto/search-tasks.dto';
import { SearchCommentsDto } from './dto/search-comments.dto';

@ApiTags('search')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('tasks')
  @ApiOperation({ summary: 'Search tasks across all accessible projects' })
  searchTasks(@Req() req: any, @Query() query: SearchTasksDto) {
    return this.searchService.searchTasks(req.user.userId, query);
  }

  @Get('comments')
  @ApiOperation({ summary: 'Search comments across all accessible projects' })
  searchComments(@Req() req: any, @Query() query: SearchCommentsDto) {
    return this.searchService.searchComments(req.user.userId, query);
  }
}
