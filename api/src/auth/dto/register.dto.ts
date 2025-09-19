import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class RegisterDto {
	@ApiProperty({ example: 'Иван Иванов', description: 'ФИО пользователя' })
	@IsString()
	@IsNotEmpty()
	name: string

	@ApiProperty({ example: 'user123', description: 'Имя пользователя' })
	@IsString()
	@IsNotEmpty()
	username: string

	@ApiProperty({ example: 'securepassword', description: 'Пароль' })
	@IsString()
	@IsNotEmpty()
	@MinLength(6)
	password: string

	@ApiProperty({ example: 'securepassword', description: 'Повтор пароля' })
	@IsString()
	@IsNotEmpty()
	repass: string

	@ApiProperty({ example: 'IT отдел', description: 'Отдел' })
	@IsString()
	@IsNotEmpty()
	division: string

	@ApiProperty({ example: 'Разработчик', description: 'Должность' })
	@IsString()
	@IsNotEmpty()
	job: string
}
