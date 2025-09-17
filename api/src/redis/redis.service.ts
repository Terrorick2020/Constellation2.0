import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { createClient, RedisClientType } from 'redis'

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
	private redis: RedisClientType

	async onModuleInit() {
		this.redis = createClient({
			url: process.env.REDIS_URL || 'redis://p09i8u7y6@redis:6379/0'
		})

		this.redis.on('error', err => {
			console.error('Redis Client Error', err)
		})

		await this.redis.connect()
	}

	async onModuleDestroy() {
		if (this.redis) {
			await this.redis.quit()
		}
	}

	async set(key: string, value: string, ttl?: number): Promise<void> {
		if (ttl) {
			await this.redis.setEx(key, ttl, value)
		} else {
			await this.redis.set(key, value)
		}
	}

	async get(key: string): Promise<string | null> {
		return await this.redis.get(key)
	}

	async del(key: string): Promise<number> {
		return await this.redis.del(key)
	}

	async exists(key: string): Promise<number> {
		return await this.redis.exists(key)
	}

	async expire(key: string, ttl: number): Promise<boolean> {
		return await this.redis.expire(key, ttl)
	}

	async ttl(key: string): Promise<number> {
		return await this.redis.ttl(key)
	}

	async hSet(key: string, field: string, value: string): Promise<number> {
		return await this.redis.hSet(key, field, value)
	}

	async hGet(key: string, field: string): Promise<string | null> {
		return await this.redis.hGet(key, field)
	}

	async hGetAll(key: string): Promise<Record<string, string>> {
		return await this.redis.hGetAll(key)
	}

	async hDel(key: string, field: string): Promise<number> {
		return await this.redis.hDel(key, field)
	}

	async lPush(key: string, value: string): Promise<number> {
		return await this.redis.lPush(key, value)
	}

	async rPush(key: string, value: string): Promise<number> {
		return await this.redis.rPush(key, value)
	}

	async lPop(key: string): Promise<string | null> {
		return await this.redis.lPop(key)
	}

	async rPop(key: string): Promise<string | null> {
		return await this.redis.rPop(key)
	}

	async lRange(key: string, start: number, stop: number): Promise<string[]> {
		return await this.redis.lRange(key, start, stop)
	}

	async lLen(key: string): Promise<number> {
		return await this.redis.lLen(key)
	}

	async sAdd(key: string, member: string): Promise<number> {
		return await this.redis.sAdd(key, member)
	}

	async sRem(key: string, member: string): Promise<number> {
		return await this.redis.sRem(key, member)
	}

	async sMembers(key: string): Promise<string[]> {
		return await this.redis.sMembers(key)
	}

	async sIsMember(key: string, member: string): Promise<boolean> {
		return await this.redis.sIsMember(key, member)
	}

	async publish(channel: string, message: string): Promise<number> {
		return await this.redis.publish(channel, message)
	}

	async subscribe(
		channel: string,
		callback: (message: string) => void
	): Promise<void> {
		await this.redis.subscribe(channel, callback)
	}

	async unsubscribe(channel: string): Promise<void> {
		await this.redis.unsubscribe(channel)
	}

	getClient(): RedisClientType {
		return this.redis
	}
}
