import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsBoolean } from 'class-validator';

export class CreateSubtaskDto {
  @ApiProperty({ example: 'Design header layout' })
  @IsString()
  title: string;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  isComplete?: boolean;

  @ApiProperty({ example: 0, required: false })
  @IsOptional()
  @IsInt()
  position?: number;

  @ApiProperty({ example: 'task-uuid' })
  @IsString()
  taskId: string;
}
