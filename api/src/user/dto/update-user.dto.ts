import { ApiPropertyOptional } from '@nestjs/swagger'
import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ description: 'Полное имя пользователя', required: false })
  name?: string

  @ApiPropertyOptional({ description: 'Имя пользователя', required: false })
  username?: string

  @ApiPropertyOptional({ description: 'Пароль пользователя', required: false })
  password?: string

  @ApiPropertyOptional({ description: 'Отдел пользователя', required: false })
  division?: string

  @ApiPropertyOptional({ description: 'Должность пользователя', required: false })
  job?: string
}
