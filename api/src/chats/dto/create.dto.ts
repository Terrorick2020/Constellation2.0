import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateDto {
	@ApiProperty({ description: 'ID пользователя, создающего чат' })
	@IsString()
	@IsNotEmpty()
	fromUser!: string

	@ApiProperty({ description: 'ID пользователя, с которым создается чат' })
	@IsString()
	@IsNotEmpty()
	toUser!: string
}
