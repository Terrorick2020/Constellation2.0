import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ description: 'Имя пользователя' })
  username: string

  @ApiProperty({ description: 'Полное имя пользователя' })
  name: string

  @ApiProperty({ description: 'Пароль пользователя' })
  password: string

  @ApiProperty({ description: 'Отдел пользователя' })
  division: string

  @ApiProperty({ description: 'Должность пользователя' })
  job: string
}
