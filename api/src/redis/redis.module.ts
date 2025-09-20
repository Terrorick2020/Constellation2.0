import { Module } from '@nestjs/common'
import { RedisPubSubService } from './redis-pub-sub.service'
import { RedisService } from './redis.service'

@Module({
  providers: [RedisService, RedisPubSubService],
  exports: [RedisService, RedisPubSubService],
})
export class RedisModule {}
