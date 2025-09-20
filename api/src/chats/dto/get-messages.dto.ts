import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator'

export class GetMessagesDto {
	@ApiProperty({ description: 'ID чата' })
	@IsString()
	@IsNotEmpty()
	chatId!: string

	@ApiProperty({ description: 'ID пользователя, запрашивающего сообщения' })
	@IsString()
	@IsNotEmpty()
	userId!: string

	@ApiProperty({ description: 'ID сообщения, до которого нужно получить сообщения', required: false })
	@IsString()
	@IsOptional()
	beforeMessageId?: string

	@ApiProperty({ description: 'Количество сообщений для получения', required: false, default: 50 })
	@IsNumber()
	@Min(1)
	@Type(() => Number)
	@IsOptional()
	limit?: number = 50

	@ApiProperty({ description: 'Смещение для пагинации', required: false, default: 0 })
	@IsNumber()
	@Min(0)
	@Type(() => Number)
	@IsOptional()
	offset?: number = 0
}
