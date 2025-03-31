import { ApiProperty } from '@nestjs/swagger'

export class RegisterDto {
	@ApiProperty({ example: 'Иван Иванов', description: 'ФИО пользователя' })
	name: string

	@ApiProperty({ example: 'user123', description: 'Имя пользователя' })
	username: string

	@ApiProperty({ example: 'securepassword', description: 'Пароль' })
	password: string

	@ApiProperty({ example: 'securepassword', description: 'Повтор пароля' })
	repass: string

	@ApiProperty({ example: 'IT отдел', description: 'Отдел' })
	division: string

	@ApiProperty({ example: 'Разработчик', description: 'Должность' })
	job: string
}
