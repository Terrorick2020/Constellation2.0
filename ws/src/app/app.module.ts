import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { ChatsModule } from './chats/chats.module'
import { RedisSubscriberService } from './redis-subscriber.service'
import { RedisModule } from './redis/redis.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
		}),
		ScheduleModule.forRoot(), // Для выполнения периодических задач
		RedisModule,
		ChatsModule,
	],
	providers: [
		RedisSubscriberService, // Сервис для Redis Pub/Sub
	],
})
export class AppModule {}
