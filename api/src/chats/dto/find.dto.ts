import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class FindDto {
	@ApiProperty({ description: 'ID пользователя для поиска чатов' })
	@IsString()
	@IsNotEmpty()
	userId!: string
}
