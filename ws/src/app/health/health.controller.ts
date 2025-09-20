import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('health')
@Controller('health')
export class HealthController {
	@Get()
	@ApiOperation({ summary: 'Проверка состояния сервиса' })
	@ApiResponse({ status: 200, description: 'Сервис работает' })
	check() {
		return {
			status: 'ok',
			timestamp: new Date().toISOString(),
			service: 'constellation-ws',
			version: '1.0.0'
		}
	}
}
