import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

export class TypingStatusDto {
	@ApiProperty({ description: 'ID чата' })
	@IsString()
	@IsNotEmpty()
	chatId!: string

	@ApiProperty({ description: 'ID пользователя, который печатает' })
	@IsString()
	@IsNotEmpty()
	userId!: string

	@ApiProperty({ description: 'Статус набора текста' })
	@IsBoolean()
	@IsNotEmpty()
	isTyping!: boolean
}
