import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { TaskPriorityDto, TaskStatusDto } from '../../tasks/dto/create-task.dto';

export class SearchCommentsDto {
  @ApiProperty({ required: false, example: 'edge cases' })
  @IsOptional()
  @IsString()
  q?: string;

  @ApiProperty({ required: false, enum: TaskStatusDto, example: 'IN_REVIEW' })
  @IsOptional()
  @IsEnum(TaskStatusDto)
  taskStatus?: TaskStatusDto;

  @ApiProperty({ required: false, enum: TaskPriorityDto, example: 'URGENT' })
  @IsOptional()
  @IsEnum(TaskPriorityDto)
  taskPriority?: TaskPriorityDto;

  @ApiProperty({ required: false, example: 'project-uuid' })
  @IsOptional()
  @IsString()
  projectId?: string;

  @ApiProperty({ required: false, example: 'label-uuid' })
  @IsOptional()
  @IsString()
  labelId?: string;

  @ApiProperty({ required: false, example: '2025-12-01T00:00:00Z' })
  @IsOptional()
  @IsDateString()
  dueFrom?: string;

  @ApiProperty({ required: false, example: '2025-12-31T23:59:59Z' })
  @IsOptional()
  @IsDateString()
  dueTo?: string;

  @ApiProperty({ required: false, example: 1, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ required: false, example: 20, default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 20;
}
