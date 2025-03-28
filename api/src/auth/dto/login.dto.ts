import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
	@ApiProperty({ example: 'user123', description: 'Имя пользователя' })
	username: string

	@ApiProperty({ example: 'securepassword', description: 'Пароль пользователя' })
	password: string
}
