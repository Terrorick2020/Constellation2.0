import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Param,
    Post,
    Request,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { FileInterceptor } from '@nestjs/platform-express'
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger'
import { Response } from 'express'
import { createReadStream } from 'fs'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	@ApiOperation({ summary: 'Регистрация пользователя' })
	@ApiResponse({
		status: 201,
		description: 'Пользователь успешно зарегистрирован'
	})
	@ApiResponse({ status: 400, description: 'Ошибка регистрации' })
	@ApiBody({ type: RegisterDto })
	register(@Body() createAuthDto: RegisterDto) {
		// Валидация полей
		if (!createAuthDto.name || !createAuthDto.username || !createAuthDto.password || 
			!createAuthDto.repass || !createAuthDto.division || !createAuthDto.job) {
			throw new BadRequestException('Все поля обязательны для заполнения')
		}
		
		if (createAuthDto.password.length < 6) {
			throw new BadRequestException('Пароль должен содержать минимум 6 символов')
		}
		
		if (createAuthDto.password !== createAuthDto.repass) {
			throw new BadRequestException('Пароли не совпадают')
		}
		
		return this.authService.register(createAuthDto)
	}

	@Get('public-key/:username')
	@ApiOperation({ summary: 'Получение публичного ключа пользователя' })
	@ApiResponse({ status: 200, description: 'Файл публичного ключа' })
	@ApiResponse({ status: 404, description: 'Ключ не найден' })
	@ApiParam({
		name: 'username',
		required: true,
		description: 'Имя пользователя'
	})
	async getPublicKey(
		@Param('username') username: string,
		@Res() res: Response
	) {
		const file = createReadStream(`./keys/${username}/public.pem`)
		res.set({
			'Content-Type': 'application/octet-stream',
			'Content-Disposition': `attachment; filename="${username}-public.pem"`
		})
		file.pipe(res)
	}

	@Post('/login')
	@ApiOperation({ summary: 'Аутентификация пользователя' })
	@ApiResponse({ status: 200, description: 'Успешный вход' })
	@ApiResponse({ status: 401, description: 'Неверные учетные данные' })
	@ApiBody({ type: LoginDto })
	create(@Body() createAuthDto: LoginDto) {
		// Валидация полей
		if (!createAuthDto.username || !createAuthDto.password) {
			throw new BadRequestException('Имя пользователя и пароль обязательны')
		}
		
		return this.authService.login(createAuthDto)
	}

	@Post('/reset')
	@UseInterceptors(FileInterceptor('file'))
	reset(@Body() dto: any, @UploadedFile() file: Express.Multer.File) {
		return this.authService.reset(dto.username, file, dto.password)
	}

	@UseGuards(AuthGuard('jwt'))
	@Get('/profile')
	@ApiOperation({ summary: 'Получение профиля текущего пользователя' })
	@ApiBearerAuth()
	@ApiResponse({ status: 200, description: 'Данные профиля' })
	@ApiResponse({ status: 401, description: 'Неавторизованный запрос' })
	profile(@Request() req) {
		return this.authService.profile(req)
	}
}
