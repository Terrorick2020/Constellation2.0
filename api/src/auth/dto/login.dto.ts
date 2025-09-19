import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginDto {
	@ApiProperty({ example: 'user123', description: 'Имя пользователя' })
	@IsString()
	@IsNotEmpty()
	username: string

	@ApiProperty({ example: 'securepassword', description: 'Пароль пользователя' })
	@IsString()
	@IsNotEmpty()
	password: string
}
