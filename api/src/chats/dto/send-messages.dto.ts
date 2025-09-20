import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class SendMessageDto {
	@ApiProperty({ description: 'ID чата' })
	@IsString()
	@IsNotEmpty()
	chatId!: string

	@ApiProperty({ description: 'ID пользователя, отправляющего сообщение' })
	@IsString()
	@IsNotEmpty()
	fromUser!: string

	@ApiProperty({ description: 'Текст сообщения' })
	@IsString()
	@IsNotEmpty()
	text!: string
}
