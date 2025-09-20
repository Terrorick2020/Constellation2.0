import { Module } from '@nestjs/common'
import { RedisModule } from '../redis/redis.module'
import { ChatsGateway } from './chats.gateway'

@Module({
	imports: [RedisModule],
	providers: [ChatsGateway],
	exports: [ChatsGateway],
})
export class ChatsModule {}
