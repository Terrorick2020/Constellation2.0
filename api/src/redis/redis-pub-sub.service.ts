import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Redis from 'ioredis'

@Injectable()
export class RedisPubSubService implements OnModuleInit, OnModuleDestroy {
	private readonly publisher: Redis
	private readonly CONTEXT = 'RedisPubSubService'

	constructor(private readonly configService: ConfigService) {
		this.publisher = new Redis({
			host: this.configService.get('REDIS_HOST', 'localhost'),
			port: parseInt(this.configService.get('REDIS_PORT', '6379')),
			password: this.configService.get('REDIS_PASSWORD', ''),
			db: parseInt(this.configService.get('REDIS_DB', '0')),
		})
	}

	async onModuleInit() {
		console.log('Redis Pub/Sub сервис инициализирован')
	}

	async onModuleDestroy() {
		await this.publisher.quit()
		console.log('Redis Pub/Sub соединение закрыто')
	}

	/**
	 * Публикация события в канал Redis
	 */
	async publish(channel: string, message: any): Promise<void> {
		try {
			// Проверка типа сообщения и преобразование в JSON если нужно
			const messageString = typeof message === 'string' 
				? message 
				: JSON.stringify(message)
			
			await this.publisher.publish(channel, messageString)
			console.log(`Событие опубликовано в канал ${channel}`)
		} catch (error: any) {
			console.error(
				`Ошибка при публикации события в канал ${channel}`,
				error
			)
		}
	}

	/**
	 * Публикация уведомления о новом сообщении
	 */
	async publishNewMessage(data: { 
		chatId: string, 
		messageId: string, 
		senderId: string, 
		recipientId: string,
		text: string, 
		timestamp: number,
		media_type?: string,
		media_url?: string
	}): Promise<void> {
		await this.publish('chat:newMessage', data)
	}

	/**
	 * Публикация уведомления о прочтении сообщения
	 */
	async publishMessageRead(data: {
		chatId: string,
		userId: string,
		messageIds: string[],
		timestamp: number
	}): Promise<void> {
		await this.publish('chat:messageRead', data)
	}

	/**
	 * Публикация уведомления о статусе набора текста
	 */
	async publishTypingStatus(data: {
		chatId: string,
		userId: string,
		isTyping: boolean,
		participants: string[]
	}): Promise<void> {
		await this.publish('chat:typing', data)
	}

	/**
	 * Публикация уведомления о новом чате
	 */
	async publishNewChat(data: {
		userId: string,
		chatId: string,
		withUser: {
			id: string,
			name: string,
			avatar: string
		},
		created_at: number,
		timestamp: number
	}): Promise<void> {
		await this.publish('chat:new', data)
	}

	/**
	 * Публикация уведомления об удалении чата
	 */
	async publishChatDeleted(data: {
		chatId: string,
		deletedByUserId: string,
		participants: string[],
		timestamp: number
	}): Promise<void> {
		await this.publish('chat:deleted', data)
	}

	/**
	 * Публикация уведомления об изменении статуса пользователя (онлайн/оффлайн)
	 */
	async publishUserStatus(data: {
		userId: string,
		status: 'online' | 'offline',
		notifyUsers: string[],
		timestamp: number
	}): Promise<void> {
		await this.publish('user:status', data)
	}
}
