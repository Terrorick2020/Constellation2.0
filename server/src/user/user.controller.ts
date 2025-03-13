import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { RegisterDto } from 'src/auth/dto/register.dto'
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBody,
	ApiParam
} from '@nestjs/swagger'
import { ErrorResponseDto } from './dto/error-response.dto' // Подключаем DTO для ошибок

@ApiTags('User') // Группируем эндпоинты в Swagger
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	@ApiOperation({ summary: 'Получить всех пользователей' })
	@ApiResponse({
		status: 200,
		description: 'Список пользователей',
		type: [CreateUserDto] // Указываем тип данных, которые будут возвращены
	})
	@ApiResponse({
		status: 404,
		description: 'Пользователь не найден',
		type: ErrorResponseDto // Ошибка с типом ErrorResponseDto
	})
	findAll() {
		return this.userService.findAll()
	}

	@Get(':id')
	@ApiOperation({ summary: 'Получить пользователя по ID' })
	@ApiResponse({
		status: 200,
		description: 'Пользователь найден',
		type: CreateUserDto
	})
	@ApiResponse({
		status: 404,
		description: 'Пользователь не найден',
		type: ErrorResponseDto // Ошибка с типом ErrorResponseDto
	})
	@ApiParam({ name: 'id', type: 'number', description: 'ID пользователя' })
	findOne(@Param('id') id: string) {
		return this.userService.findOne(+id)
	}

	@Post()
	@ApiOperation({ summary: 'Создать нового пользователя' })
	@ApiBody({ type: CreateUserDto }) // Описание тела запроса
	@ApiResponse({
		status: 201,
		description: 'Пользователь успешно создан',
		type: CreateUserDto
	})
	@ApiResponse({
		status: 400,
		description: 'Ошибка при создании пользователя',
		type: ErrorResponseDto // Ошибка с типом ErrorResponseDto
	})
	create(@Body() createUserDto: RegisterDto) {
		return this.userService.create(createUserDto)
	}

	@Put(':id')
	@ApiOperation({ summary: 'Обновить данные пользователя' })
	@ApiResponse({
		status: 200,
		description: 'Пользователь успешно обновлен',
		type: UpdateUserDto 
	})
	@ApiResponse({
		status: 404,
		description: 'Пользователь не найден',
		type: ErrorResponseDto 
	})
	@ApiParam({ name: 'id', type: 'number', description: 'ID пользователя' })
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(+id, updateUserDto)
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Удалить пользователя' })
	@ApiResponse({
		status: 200,
		description: 'Пользователь успешно удален'
	})
	@ApiResponse({
		status: 404,
		description: 'Пользователь не найден',
		type: ErrorResponseDto 
	})
	@ApiParam({ name: 'id', type: 'number', description: 'ID пользователя' })
	remove(@Param('id') id: string) {
		return this.userService.remove(+id)
	}
}
