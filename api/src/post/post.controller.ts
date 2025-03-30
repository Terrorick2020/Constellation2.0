import { Controller, Get, Param, Query, Post, Body, Put, Delete, UploadedFile, UseInterceptors, UseGuards, Request } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger'
import { PostService } from './post.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { AuthGuard } from '@nestjs/passport'

@ApiTags('Post') // Группируем эндпоинты в Swagger
@Controller('post')
export class PostController {
	constructor(private readonly postService: PostService) {}

	@Get()
	@ApiOperation({ summary: 'Получить список постов' })
	@ApiResponse({ status: 200, description: 'Список постов' })
	@ApiQuery({ name: 'page', required: false, example: '1', description: 'Номер страницы' })
	@ApiQuery({ name: 'limit', required: false, example: '10', description: 'Количество постов на странице' })
	findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
		const pageNumber = parseInt(page || '1', 10)
		const limitNumber = parseInt(limit || '10', 10)
		return this.postService.findAll(pageNumber, limitNumber)
	}

	@Get(':id')
	@ApiOperation({ summary: 'Получить один пост' })
	@ApiResponse({ status: 200, description: 'Пост найден' })
	@ApiResponse({ status: 404, description: 'Пост не найден' })
	@ApiParam({ name: 'id', example: '1', description: 'ID поста' })
	findOne(@Param('id') id: string) {
		return this.postService.findOne(+id)
	}

	@UseGuards(AuthGuard('jwt'))
	@Post()
	@UseInterceptors(FileInterceptor('file'))
	@ApiOperation({ summary: 'Создать новый пост' })
	@ApiBearerAuth()
	@ApiConsumes('multipart/form-data')
	@ApiResponse({ status: 201, description: 'Пост успешно создан' })
	@ApiResponse({ status: 400, description: 'Ошибка при создании поста' })
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				title: { type: 'string', example: 'Новый пост' },
				file: { type: 'string', format: 'binary' }
			}
		}
	})
	create(@Request() req, @Body() dto: CreatePostDto, @UploadedFile() file: Express.Multer.File) {
		return this.postService.create(req.user.id, dto, file)
	}

	@UseGuards(AuthGuard('jwt'))
	@Put(':id')
	@ApiOperation({ summary: 'Обновить пост' })
	@ApiBearerAuth()
	@ApiResponse({ status: 200, description: 'Пост обновлен' })
	@ApiResponse({ status: 404, description: 'Пост не найден' })
	@ApiParam({ name: 'id', example: '1', description: 'ID поста' })
	@ApiBody({ type: UpdatePostDto })
	update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
		return this.postService.update(+id, updatePostDto)
	}

	@UseGuards(AuthGuard('jwt'))
	@Delete(':id')
	@ApiOperation({ summary: 'Удалить пост' })
	@ApiBearerAuth()
	@ApiResponse({ status: 200, description: 'Пост удален' })
	@ApiResponse({ status: 404, description: 'Пост не найден' })
	@ApiParam({ name: 'id', example: '1', description: 'ID поста' })
	remove(@Param('id') id: string) {
		return this.postService.remove(+id)
	}
}
