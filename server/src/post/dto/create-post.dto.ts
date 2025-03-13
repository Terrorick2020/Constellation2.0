import { ApiProperty } from '@nestjs/swagger'

export class CreatePostDto {
	@ApiProperty({ example: 'Название поста', description: 'Заголовок поста' })
	title: string
}
