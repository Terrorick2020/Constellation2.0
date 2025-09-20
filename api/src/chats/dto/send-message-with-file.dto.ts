import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator'

export class SendMessageWithFileDto {
	@ApiProperty({ description: 'ID чата' })
	@IsString()
	@IsNotEmpty()
	chatId!: string

	@ApiProperty({ description: 'ID пользователя, отправляющего сообщение' })
	@IsString()
	@IsNotEmpty()
	fromUser!: string

	@ApiProperty({ description: 'Текст сообщения', required: false })
	@IsString()
	@IsOptional()
	text?: string

	@ApiProperty({ description: 'Тип медиафайла', required: false })
	@IsString()
	@IsOptional()
	mediaType?: string

	@ApiProperty({ description: 'Имя файла', required: false })
	@IsString()
	@IsOptional()
	fileName?: string

	@ApiProperty({ description: 'Размер файла в байтах', required: false })
	@IsNumber()
	@IsOptional()
	@Min(1)
	@Max(100 * 1024 * 1024) // 100MB максимум
	fileSize?: number
}
