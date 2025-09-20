import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class DeleteChatDto {
	@ApiProperty({ description: 'ID пользователя, который удаляет чат' })
	@IsString()
	@IsNotEmpty()
	deletedByUserId!: string
}
