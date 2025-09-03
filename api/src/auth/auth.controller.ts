import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	UseGuards,
	Request,
	Res,
	UseInterceptors,
	UploadedFile
} from '@nestjs/common'
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth,
	ApiBody,
	ApiParam
} from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { AuthGuard } from '@nestjs/passport'
import { Response } from 'express'
import { createReadStream } from 'fs'
import { FileInterceptor } from '@nestjs/platform-express'

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
