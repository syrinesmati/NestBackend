import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsBoolean } from 'class-validator';

export class UpdateSubtaskDto {
  @ApiProperty({ example: 'Design header layout v2', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isComplete?: boolean;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsInt()
  position?: number;
}
