import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class ReadMessagesDto {
	@ApiProperty({ description: 'ID чата' })
	@IsString()
	@IsNotEmpty()
	chatId!: string

	@ApiProperty({ description: 'ID пользователя, который читает сообщения' })
	@IsString()
	@IsNotEmpty()
	userId!: string

	@ApiProperty({ description: 'ID последнего прочитанного сообщения' })
	@IsString()
	@IsNotEmpty()
	lastReadMessageId!: string
}
