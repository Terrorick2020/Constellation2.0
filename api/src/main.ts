import { NestFactory } from '@nestjs/core'
import * as dotenv from 'dotenv'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

dotenv.config()

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix('api')
	// Настройка CORS
	const corsOptions = {
		origin: '*',
		// origin: process.env.CORS_ORIGIN || '*',
		// methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
		// allowedHeaders: ['Content-Type', 'Authorization']
	}

	const config = new DocumentBuilder()
		.setTitle('API документация')
		.setDescription('Описание API')
		.setVersion('2.0')
		.addBearerAuth() 
		.build()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('api/docs', app, document)

	app.enableCors(corsOptions)

	await app.listen(7000)
}

bootstrap()
