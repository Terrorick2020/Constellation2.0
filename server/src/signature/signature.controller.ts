import { Controller, Get, Param, Query, Post, Body, Put, Delete, UploadedFile, UseInterceptors, UseGuards, Request } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger'
import { SignatureService } from './signature.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { AuthGuard } from '@nestjs/passport'

@ApiTags('Signature') // Группируем эндпоинты в Swagger
@Controller('signature')
export class SignatureController {
	constructor(private readonly signatureService: SignatureService) {}

	@Post('create')
	@UseGuards(AuthGuard('jwt'))
	@UseInterceptors(FileInterceptor('file'))
	@ApiOperation({ summary: 'Создать подпись для поста' })
	@ApiBearerAuth()
	@ApiConsumes('multipart/form-data')
	@ApiResponse({ status: 201, description: 'Подпись успешно добавлена' })
	@ApiResponse({ status: 400, description: 'Ошибка при добавлении подписи' })
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				postId: { type: 'number', example: 1 },
				file: { type: 'string', format: 'binary' }
			}
		}
	})
	async create(@Request() req, @Body() dto: any, @UploadedFile() file: Express.Multer.File) {
		return this.signatureService.create(dto.postId, file, req)
	}

	@Get('all/:postId')
	@ApiOperation({ summary: 'Получить все подписи для поста' })
	@ApiResponse({ status: 200, description: 'Список подписей' })
	@ApiResponse({ status: 404, description: 'Пост не найден' })
	@ApiParam({ name: 'postId', example: '1', description: 'ID поста' })
	async findAll(@Param('postId') postId: number) {
		return this.signatureService.findAll(postId)
	}
}
