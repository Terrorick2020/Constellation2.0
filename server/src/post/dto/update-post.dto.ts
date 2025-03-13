import { PartialType } from '@nestjs/mapped-types'
import { CreatePostDto } from './create-post.dto'
import { ApiProperty } from '@nestjs/swagger'

export class UpdatePostDto extends PartialType(CreatePostDto) {
	@ApiProperty({ example: 'Обновленный заголовок', description: 'Заголовок поста', required: false })
	title?: string
}
