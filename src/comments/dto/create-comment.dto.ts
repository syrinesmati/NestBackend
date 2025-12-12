import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'Please add error states for form inputs.' })
  @IsString()
  content: string;

  @ApiProperty({ example: 'task-uuid' })
  @IsString()
  taskId: string;
}
