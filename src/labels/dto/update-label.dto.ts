import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateLabelDto {
  @ApiProperty({ example: 'Frontend', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: '#F59E0B', required: false })
  @IsOptional()
  @IsString()
  color?: string;
}
