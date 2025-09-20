import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { RedisPubSubService } from './redis-pub-sub.service'
import { RedisService } from './redis.service'

@Module({
  imports: [ConfigModule],
  providers: [RedisService, RedisPubSubService],
  exports: [RedisService, RedisPubSubService],
})
export class RedisModule {}
