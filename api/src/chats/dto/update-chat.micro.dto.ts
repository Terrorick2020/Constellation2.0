import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateChatMicroDto {
	@ApiProperty({ description: 'ID чата' })
	@IsString()
	@IsNotEmpty()
	chatId!: string

	@ApiProperty({ description: 'ID пользователя' })
	@IsString()
	@IsNotEmpty()
	userId!: string

	@ApiProperty({ description: 'Новые данные чата', required: false })
	@IsOptional()
	data?: any
}
