import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class CreateAttachmentDto {
  @ApiProperty({ example: 'design-spec.pdf' })
  @IsString()
  fileName: string;

  @ApiProperty({ example: 'https://files.example.com/design-spec.pdf' })
  @IsString()
  fileUrl: string;

  @ApiProperty({ example: 204800 })
  @IsInt()
  fileSize: number;

  @ApiProperty({ example: 'application/pdf' })
  @IsString()
  mimeType: string;

  @ApiProperty({ example: 'task-uuid' })
  @IsString()
  taskId: string;
}
