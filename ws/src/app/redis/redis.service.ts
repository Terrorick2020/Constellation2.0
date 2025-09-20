import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Redis from 'ioredis'

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
	public redis: Redis
	private readonly CONTEXT = 'RedisService'

	constructor(private readonly configService: ConfigService) {
		this.redis = new Redis({
			host: this.configService.get('REDIS_HOST', 'localhost'),
			port: parseInt(this.configService.get('REDIS_PORT', '6379')),
			password: this.configService.get('REDIS_PASSWORD', ''),
			db: parseInt(this.configService.get('REDIS_DB', '0')),
		})
	}

	async onModuleInit() {
		console.log('Redis service initialized')
	}

	async onModuleDestroy() {
		await this.redis.quit()
		console.log('Redis connection closed')
	}
}
