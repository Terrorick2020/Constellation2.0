import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({ example: 404, description: 'HTTP статус ошибки' })
  statusCode: number;

  @ApiProperty({ example: 'Not Found', description: 'Описание ошибки' })
  message: string;

  @ApiProperty({ example: 'Resource not found', description: 'Дополнительное описание ошибки' })
  error: string;
}
