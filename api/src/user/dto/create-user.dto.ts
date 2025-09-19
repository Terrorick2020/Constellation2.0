import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({ description: 'Имя пользователя' })
  @IsString()
  @IsNotEmpty()
  username: string

  @ApiProperty({ description: 'Полное имя пользователя' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ description: 'Пароль пользователя' })
  @IsString()
  @IsNotEmpty()
  password: string

  @ApiProperty({ description: 'Отдел пользователя' })
  @IsString()
  @IsNotEmpty()
  division: string

  @ApiProperty({ description: 'Должность пользователя' })
  @IsString()
  @IsNotEmpty()
  job: string
}
