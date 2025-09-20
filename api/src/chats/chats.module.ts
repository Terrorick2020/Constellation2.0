import { Module } from '@nestjs/common'
import { JwtStrategy } from '../auth/jwt.strategy'
import { PrismaModule } from '../prisma/prisma.module'
import { RedisModule } from '../redis/redis.module'
import { StorageService } from '../storage/storage.service'
import { ChatsController } from './chats.controller'
import { ChatsGateway } from './chats.gateway'
import { ChatsMicroController } from './chats.micro.controller'
import { ChatsService } from './chats.service'

@Module({
	imports: [PrismaModule, RedisModule],
	controllers: [ChatsController, ChatsMicroController],
	providers: [ChatsService, ChatsGateway, StorageService, JwtStrategy],
	exports: [ChatsService]
})
export class ChatsModule {}
