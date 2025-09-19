import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreatePostDto {
	@ApiProperty({ example: 'Название поста', description: 'Заголовок поста' })
	@IsString()
	@IsNotEmpty()
	title: string
}
