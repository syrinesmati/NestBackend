import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({ example: 'Updated: include disabled state hint.', required: false })
  @IsOptional()
  @IsString()
  content?: string;
}
