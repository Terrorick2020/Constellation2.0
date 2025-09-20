import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AppModule } from './app/app.module'

async function bootstrap() {
	const logger = new Logger('Bootstrap')
	const app = await NestFactory.create(AppModule)

	// Получаем конфигурацию из ConfigService
	const configService = app.get(ConfigService)

	// Настраиваем порт WebSocket сервера
	const wsPort = configService.get('WS_PORT', 7000)
	
	// Настраиваем TCP для микросервисной коммуникации
	const tcpHost = configService.get('TCP_HOST', 'localhost')
	const tcpPort = configService.get('TCP_PORT', 7756)

	logger.log(`WebSocket server will start on port: ${wsPort}`)
	logger.log(`TCP microservice will start on ${tcpHost}:${tcpPort}`)

	// Включаем TCP для микросервисной коммуникации
	app.connectMicroservice<MicroserviceOptions>({
		transport: Transport.TCP,
		options: {
			host: tcpHost,
			port: tcpPort,
		},
	})

	// Запускаем микросервисы
	await app.startAllMicroservices()

	// Запускаем основной сервер
	await app.listen(wsPort)

	logger.log(`WebSocket server started on port ${wsPort}`)
	logger.log(`TCP microservice running on ${tcpHost}:${tcpPort}`)
}

bootstrap().catch(err => {
	console.error('Failed to start WebSocket server:', err)
	process.exit(1)
})
