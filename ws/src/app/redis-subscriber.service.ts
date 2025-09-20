import {
    Injectable,
    Logger,
    OnModuleDestroy,
    OnModuleInit,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Redis from 'ioredis'
import { ChatsGateway } from './chats/chats.gateway'

@Injectable()
export class RedisSubscriberService implements OnModuleInit, OnModuleDestroy {
	private readonly logger = new Logger(RedisSubscriberService.name)
	private subscriber: Redis
	private readonly channels = [
		'chat:newMessage',
		'chat:messageRead',
		'chat:typing',
		'chat:new',
		'chat:deleted',
		'user:status',
	]

	constructor(
		private readonly configService: ConfigService,
		private readonly chatsGateway: ChatsGateway
	) {
		this.subscriber = new Redis({
			host: this.configService.get('REDIS_HOST', 'localhost'),
			port: Number(this.configService.get('REDIS_PORT', 6379)),
			password: this.configService.get('REDIS_PASSWORD', ''),
			db: Number(this.configService.get('REDIS_DB', 0)),
		})
	}

	async onModuleInit() {
		try {
			// Подписываемся на все каналы
			await this.subscriber.subscribe(...this.channels)

			// Настраиваем обработчик сообщений
			this.subscriber.on('message', (channel, message) => {
				try {
					const data = JSON.parse(message)
					this.handleRedisMessage(channel, data)
				} catch (error) {
					this.logger.error(
						`Error processing Redis message: ${error.message}`,
						error.stack
					)
				}
			})

			this.logger.log('Redis Pub/Sub subscriptions initialized')
		} catch (error) {
			this.logger.error(
				`Failed to initialize Redis Pub/Sub: ${error.message}`,
				error.stack
			)
		}
	}

	async onModuleDestroy() {
		try {
			await this.subscriber.unsubscribe(...this.channels)
			await this.subscriber.quit()
			this.logger.log('Redis Pub/Sub connections closed')
		} catch (error) {
			this.logger.error(
				`Error closing Redis Pub/Sub connections: ${error.message}`
			)
		}
	}

	private handleRedisMessage(channel: string, data: any) {
		this.logger.debug(`Received message on channel ${channel}`)

		switch (channel) {
			case 'chat:newMessage':
				this.handleNewMessage(data)
				break
			case 'chat:messageRead':
				this.handleMessageRead(data)
				break
			case 'chat:typing':
				this.handleTypingStatus(data)
				break
			case 'chat:new':
				this.handleNewChat(data)
				break
			case 'chat:deleted':
				this.handleChatDeleted(data)
				break
			case 'user:status':
				this.handleUserStatusChange(data)
				break
			default:
				this.logger.warn(`Unknown Redis channel: ${channel}`)
		}
	}

	private handleNewMessage(data: any) {
		const { chatId, recipientId, messageId, senderId, text, timestamp, media_type, media_url } = data

		// Отправляем уведомление получателю
		if (recipientId) {
			this.chatsGateway.sendNewMessageNotification(recipientId, {
				chatId,
				messageId,
				senderId,
				text,
				timestamp,
				media_type,
				media_url
			})
		}
	}

	private handleMessageRead(data: any) {
		const { chatId, userId, messageIds, timestamp } = data

		// Отправляем уведомление о прочтении сообщений
		if (messageIds && messageIds.length > 0) {
			this.chatsGateway.sendMessageReadNotification(userId, {
				chatId,
				messageIds,
				timestamp
			})
		}
	}

	private handleTypingStatus(data: any) {
		const { chatId, userId, isTyping, participants } = data

		// Отправляем уведомление о статусе набора текста всем участникам чата
		if (participants && Array.isArray(participants)) {
			this.chatsGateway.sendTypingStatusNotification(participants, userId, isTyping)
		}
	}

	private handleNewChat(data: any) {
		const { userId, chatId, withUser, created_at, timestamp } = data

		// Отправляем уведомление о новом чате
		if (userId) {
			this.chatsGateway.sendNewChatNotification(userId, {
				chatId,
				withUser,
				created_at,
				timestamp
			})
		}
	}

	private handleChatDeleted(data: any) {
		const { chatId, deletedByUserId, participants, timestamp } = data

		// Отправляем уведомление об удалении чата всем участникам
		if (participants && Array.isArray(participants)) {
			this.chatsGateway.sendChatDeletedNotification(participants, {
				chatId,
				deletedByUserId,
				timestamp
			})
		}
	}

	private handleUserStatusChange(data: any) {
		const { userId, status, notifyUsers, timestamp } = data

		// Отправляем уведомление о изменении статуса пользователя
		if (notifyUsers && Array.isArray(notifyUsers)) {
			this.chatsGateway.sendUserStatusNotification(notifyUsers, {
				userId,
				status,
				timestamp
			})
		}
	}
}
