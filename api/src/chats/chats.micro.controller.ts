import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { ChatsService } from './chats.service'
import { ConnectionDto, MicroServiceResponse } from './chats.types'

@Controller()
export class ChatsMicroController {
	constructor(private readonly chatsService: ChatsService) {}

	@MessagePattern('getUserChats')
	async getUserChats(@Payload() data: { userId: string }): Promise<MicroServiceResponse> {
		try {
			const chats = await this.chatsService.getUserChats(data.userId)
			return {
				success: true,
				data: chats,
				message: 'Чаты пользователя получены'
			}
		} catch (error) {
			return {
				success: false,
				error,
				message: 'Ошибка при получении чатов пользователя'
			}
		}
	}

	@MessagePattern('getChatDetails')
	async getChatDetails(@Payload() data: { chatId: string }): Promise<MicroServiceResponse> {
		try {
			const chat = await this.chatsService.getChatById(data.chatId)
			if (!chat) {
				return {
					success: false,
					message: 'Чат не найден'
				}
			}

			// Получаем последнее сообщение
			const messages = await this.chatsService.getMessages(data.chatId, '', { 
				chatId: data.chatId,
				userId: '',
				limit: 1 
			})
			const lastMessage = messages.length > 0 ? messages[0] : null

			return {
				success: true,
				data: {
					id: data.chatId,
					metadata: chat,
					lastMessage,
					readStatus: {} // TODO: реализовать получение статуса прочтения
				},
				message: 'Детали чата получены'
			}
		} catch (error) {
			return {
				success: false,
				error,
				message: 'Ошибка при получении деталей чата'
			}
		}
	}

	@MessagePattern('getChatMessages')
	async getChatMessages(
		@Payload() data: { chatId: string; limit?: number; offset?: number }
	): Promise<MicroServiceResponse> {
		try {
			const messages = await this.chatsService.getMessages(
				data.chatId,
				'', // userId не нужен для микросервисного вызова
				{
					chatId: data.chatId,
					userId: '',
					limit: data.limit || 50,
					offset: data.offset || 0
				}
			)

			return {
				success: true,
				data: messages,
				message: 'Сообщения чата получены'
			}
		} catch (error) {
			return {
				success: false,
				error,
				message: 'Ошибка при получении сообщений чата'
			}
		}
	}

	@MessagePattern('joinRoom')
	async joinRoom(@Payload() data: ConnectionDto): Promise<MicroServiceResponse> {
		try {
			// Логируем присоединение к комнате
			console.log(`Пользователь ${data.userId} присоединяется к комнате ${data.roomName}`)
			
			return {
				success: true,
				data: {
					roomName: data.roomName,
					userId: data.userId,
					status: 'success'
				},
				message: 'Пользователь присоединился к комнате'
			}
		} catch (error) {
			return {
				success: false,
				error,
				message: 'Ошибка при присоединении к комнате'
			}
		}
	}

	@MessagePattern('leaveRoom')
	async leaveRoom(@Payload() data: ConnectionDto): Promise<MicroServiceResponse> {
		try {
			// Логируем покидание комнаты
			console.log(`Пользователь ${data.userId} покидает комнату ${data.roomName}`)
			
			return {
				success: true,
				data: {
					roomName: data.roomName,
					userId: data.userId,
					status: 'success'
				},
				message: 'Пользователь покинул комнату'
			}
		} catch (error) {
			return {
				success: false,
				error,
				message: 'Ошибка при покидании комнаты'
			}
		}
	}
}
