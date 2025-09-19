import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as dotenv from 'dotenv'
import { AppModule } from './app.module'

dotenv.config()

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	
	// Добавляем глобальный валидатор
	app.useGlobalPipes(new ValidationPipe({
		whitelist: true,
		forbidNonWhitelisted: true,
		transform: true
	}))
	
	// app.setGlobalPrefix('api')
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

	await app.listen(4200)
}

bootstrap()
