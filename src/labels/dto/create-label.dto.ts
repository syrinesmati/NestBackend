import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateLabelDto {
  @ApiProperty({ example: 'Frontend' })
  @IsString()
  name: string;

  @ApiProperty({ example: '#F59E0B' })
  @IsString()
  color: string;
}
