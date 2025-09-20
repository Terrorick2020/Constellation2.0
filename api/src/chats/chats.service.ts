import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { RedisPubSubService } from '../redis/redis-pub-sub.service'
import { RedisService } from '../redis/redis.service'
import { StorageService } from '../storage/storage.service'
import type { ChatPreview, ResCreateChat } from './chats.types'
import { type ChatMsg } from './chats.types'
import { GetMessagesDto } from './dto/get-messages.dto'
import { ReadMessagesDto } from './dto/read-messages.dto'
import { SendMessageWithFileDto } from './dto/send-message-with-file.dto'
import { SendMessageDto } from './dto/send-messages.dto'
import { TypingStatusDto } from './dto/typing-status.dto'

@Injectable()
export class ChatsService {
	private readonly CONTEXT = 'ChatsService'

	constructor(
		private readonly prismaService: PrismaService,
		private readonly redisService: RedisService,
		private readonly redisPubSubService: RedisPubSubService,
		private readonly storageService: StorageService
	) {}

	/**
	 * Создание нового чата между двумя пользователями
	 */
	async createChat(
		fromUserId: string,
		toUserId: string
	): Promise<ResCreateChat> {
		try {
			console.log('DEBUG: createChat - fromUserId:', fromUserId, 'type:', typeof fromUserId)
			console.log('DEBUG: createChat - toUserId:', toUserId, 'type:', typeof toUserId)
			
			// Проверяем, что toUserId не пустой
			if (!toUserId || toUserId === 'undefined' || toUserId === 'null') {
				throw new Error('toUserId не может быть пустым');
			}
			
			// Находим пользователя по username, если toUserId не является ID
			let toUser;
			// Проверяем, является ли toUserId уже ID пользователя (cuid формат)
			if (toUserId.length > 20) {
				// toUserId - это ID пользователя
				toUser = await this.prismaService.user.findUnique({
					where: { id: toUserId }
				});
				
				if (!toUser) {
					throw new Error(`Пользователь с ID "${toUserId}" не найден`);
				}
			} else {
				// toUserId - это username
				toUser = await this.prismaService.user.findUnique({
					where: { username: toUserId }
				});
				
				if (!toUser) {
					throw new Error(`Пользователь с username "${toUserId}" не найден`);
				}
			}

			// Проверяем, существует ли уже чат между этими пользователями
			const existingChat = await this.prismaService.chat.findFirst({
				where: {
					participants: {
						hasEvery: [fromUserId, toUser.id]
					}
				}
			})

			if (existingChat) {
				return {
					chatId: existingChat.id,
					toUser: toUser.username
				}
			}

			// Создаем новый чат
			const chat = await this.prismaService.chat.create({
				data: {
					participants: [fromUserId, toUser.id],
					typing: []
				}
			})

			// Создаем записи UserChat для обоих пользователей
			await this.prismaService.userChat.createMany({
				data: [
					{
						chatId: chat.id,
						userId: fromUserId
					},
					{
						chatId: chat.id,
						userId: toUser.id
					}
				]
			})

			// Уведомляем обоих пользователей о создании нового чата
			for (const participantId of [fromUserId, toUser.id]) {
				const otherParticipantId = participantId === fromUserId ? toUser.id : fromUserId
				const otherUser = participantId === fromUserId ? toUser : await this.prismaService.user.findUnique({
					where: { id: fromUserId }
				})

				await this.redisPubSubService.publishNewChat({
					userId: participantId,
					chatId: chat.id,
					withUser: {
						id: otherParticipantId,
						name: otherUser?.name || 'Unknown',
						avatar: '' // TODO: добавить аватар пользователя
					},
					created_at: chat.createdAt.getTime(),
					timestamp: Date.now()
				})
			}

			return {
				chatId: chat.id,
				toUser: toUser.username
			}
		} catch (error) {
			console.error('Ошибка при создании чата:', error)
			throw error
		}
	}

	/**
	 * Отправка сообщения с файлом в чат
	 */
	async sendMessageWithFile(
		chatId: string,
		fromUserId: string,
		file: Express.Multer.File,
		messageData: SendMessageWithFileDto
	): Promise<ChatMsg> {
		try {
			// Проверяем существование чата
			const chat = await this.prismaService.chat.findUnique({
				where: { id: chatId }
			})

			if (!chat) {
				throw new Error('Чат не найден')
			}

			// Проверяем, является ли пользователь участником чата
			if (!chat.participants.includes(fromUserId)) {
				throw new Error('Пользователь не является участником чата')
			}

			// Определяем тип файла
			const fileType = this.getFileType(file.mimetype)

			// Сохраняем файл
			const savedFile = await this.storageService.saveChatFile(
				chatId,
				file,
				fileType
			)

			// Создаем сообщение с файлом
			const message = await this.prismaService.message.create({
				data: {
					chatId,
					fromUserId: fromUserId,
					text: messageData.text || '',
					mediaType: file.mimetype,
					mediaUrl: savedFile.url,
					fileName: savedFile.filename,
					fileSize: file.size,
					filePath: savedFile.path,
					isRead: false
				}
			})

			// Обновляем информацию о последнем сообщении в чате
			await this.prismaService.chat.update({
				where: { id: chatId },
				data: {
					lastMessageId: message.id,
					lastMessageAt: message.createdAt
				}
			})

			const resultMessage: ChatMsg = {
				id: message.id,
				chatId: message.chatId,
				fromUser: message.fromUserId,
				text: message.text,
				created_at: message.createdAt.getTime(),
				updated_at: message.updatedAt.getTime(),
				is_read: message.isRead,
				media_type: message.mediaType,
				media_url: message.mediaUrl
			}

			// Уведомляем других участников о новом сообщении через Redis Pub/Sub
			const recipientId = chat.participants.find(id => id !== fromUserId)
			if (recipientId) {
				await this.redisPubSubService.publishNewMessage({
					chatId,
					messageId: message.id,
					senderId: fromUserId,
					recipientId,
					text: messageData.text || '',
					timestamp: message.createdAt.getTime(),
					media_type: message.mediaType,
					media_url: message.mediaUrl
				})
			}

			return resultMessage
		} catch (error) {
			console.error('Ошибка при отправке сообщения с файлом:', error)
			throw error
		}
	}

	/**
	 * Определение типа файла по MIME-типу
	 */
	private getFileType(
		mimetype: string
	): 'image' | 'video' | 'audio' | 'document' {
		if (mimetype.startsWith('image/')) return 'image'
		if (mimetype.startsWith('video/')) return 'video'
		if (mimetype.startsWith('audio/')) return 'audio'
		return 'document'
	}

	/**
	 * Отправка сообщения в чат
	 */
	async sendMessage(
		chatId: string,
		fromUserId: string,
		messageData: SendMessageDto
	): Promise<ChatMsg> {
		try {
			// Проверяем существование чата
			const chat = await this.prismaService.chat.findUnique({
				where: { id: chatId }
			})

			if (!chat) {
				throw new Error('Чат не найден')
			}

			// Проверяем, является ли пользователь участником чата
			if (!chat.participants.includes(fromUserId)) {
				throw new Error('Пользователь не является участником чата')
			}

			// Создаем сообщение
			const message = await this.prismaService.message.create({
				data: {
					chatId,
					fromUserId: fromUserId,
					text: messageData.text,
					isRead: false
				}
			})

			// Обновляем информацию о последнем сообщении в чате
			await this.prismaService.chat.update({
				where: { id: chatId },
				data: {
					lastMessageId: message.id,
					lastMessageAt: message.createdAt
				}
			})

			const resultMessage: ChatMsg = {
				id: message.id,
				chatId: message.chatId,
				fromUser: message.fromUserId,
				text: message.text,
				created_at: message.createdAt.getTime(),
				updated_at: message.updatedAt.getTime(),
				is_read: message.isRead,
				media_type: message.mediaType,
				media_url: message.mediaUrl
			}

			// Уведомляем других участников о новом сообщении через Redis Pub/Sub
			const recipientId = chat.participants.find(id => id !== fromUserId)
			if (recipientId) {
				await this.redisPubSubService.publishNewMessage({
					chatId,
					messageId: message.id,
					senderId: fromUserId,
					recipientId,
					text: messageData.text,
					timestamp: message.createdAt.getTime(),
					media_type: message.mediaType,
					media_url: message.mediaUrl
				})
			}

			return resultMessage
		} catch (error) {
			console.error('Ошибка при отправке сообщения:', error)
			throw error
		}
	}

	/**
	 * Получение сообщений чата
	 */
	async getMessages(
		chatId: string,
		userId: string,
		query: GetMessagesDto
	): Promise<ChatMsg[]> {
		try {
			// Проверяем существование чата и участие пользователя
			const chat = await this.prismaService.chat.findUnique({
				where: { id: chatId }
			})

			if (!chat || !chat.participants.includes(userId)) {
				throw new Error('Чат не найден или пользователь не является участником')
			}

			// Получаем сообщения из базы данных
			const where: any = { chatId }
			if (query.beforeMessageId) {
				const beforeMessage = await this.prismaService.message.findUnique({
					where: { id: query.beforeMessageId }
				})
				if (beforeMessage) {
					where.createdAt = { lt: beforeMessage.createdAt }
				}
			}

			const messages = await this.prismaService.message.findMany({
				where,
				orderBy: { createdAt: 'desc' },
				take: query.limit || 50
			})

		return messages.map(msg => ({
			id: msg.id,
			chatId: msg.chatId,
			fromUser: msg.fromUserId.toString(),
			text: msg.text,
			created_at: msg.createdAt.getTime(),
			updated_at: msg.updatedAt.getTime(),
			is_read: msg.isRead,
			media_type: msg.mediaType,
				media_url: msg.mediaUrl
			}))
		} catch (error) {
			console.error('Ошибка при получении сообщений:', error)
			throw error
		}
	}

	/**
	 * Отметка сообщений как прочитанных
	 */
	async markMessagesAsRead(
		chatId: string,
		userId: string,
		data: ReadMessagesDto
	): Promise<void> {
		try {
			// Проверяем существование чата и участие пользователя
			const chat = await this.prismaService.chat.findUnique({
				where: { id: chatId }
			})

			if (!chat || !chat.participants.includes(userId)) {
				throw new Error('Чат не найден или пользователь не является участником')
			}

		// Обновляем UserChat с последним прочитанным сообщением
		await this.prismaService.userChat.update({
			where: {
				chatId_userId: {
					chatId,
					userId: userId
				}
			},
				data: {
					lastReadMessageId: data.messageId
				}
			})

			// Если указано конкретное сообщение, отмечаем его как прочитанное
			if (data.messageId) {
				await this.prismaService.message.update({
					where: { id: data.messageId },
					data: { isRead: true }
				})

				// Уведомляем отправителя о прочтении сообщения
				const message = await this.prismaService.message.findUnique({
					where: { id: data.messageId }
				})
				if (message && message.fromUserId !== userId) {
					await this.redisPubSubService.publishMessageRead({
						chatId,
						userId: message.fromUserId,
						messageIds: [data.messageId],
						timestamp: Date.now()
					})
				}
			} else {
				// Отмечаем все непрочитанные сообщения как прочитанные
				const unreadMessages = await this.prismaService.message.findMany({
					where: {
						chatId,
						fromUserId: { not: userId },
						isRead: false
					},
					select: { id: true, fromUserId: true }
				})

				await this.prismaService.message.updateMany({
					where: {
						chatId,
						fromUserId: { not: userId },
						isRead: false
					},
					data: { isRead: true }
				})

				// Уведомляем отправителей о прочтении сообщений
				const messageIds = unreadMessages.map(msg => msg.id)
				const senderIds = [...new Set(unreadMessages.map(msg => msg.fromUserId))]
				
				for (const senderId of senderIds) {
					await this.redisPubSubService.publishMessageRead({
						chatId,
						userId: senderId,
						messageIds,
						timestamp: Date.now()
					})
				}
			}
		} catch (error) {
			console.error('Ошибка при отметке сообщений как прочитанных:', error)
			throw error
		}
	}

	/**
	 * Обновление статуса печати
	 */
	async updateTypingStatus(
		chatId: string,
		userId: string,
		data: TypingStatusDto
	): Promise<void> {
		try {
			// Проверяем существование чата и участие пользователя
			const chat = await this.prismaService.chat.findUnique({
				where: { id: chatId }
			})

			if (!chat || !chat.participants.includes(userId)) {
				throw new Error('Чат не найден или пользователь не является участником')
			}

			const userIdStr = userId
			let typingUsers = [...chat.typing]

			if (data.isTyping) {
				if (!typingUsers.includes(userIdStr)) {
					typingUsers.push(userIdStr)
				}
			} else {
				typingUsers = typingUsers.filter(id => id !== userIdStr)
			}

			// Обновляем статус печати в базе данных
			await this.prismaService.chat.update({
				where: { id: chatId },
				data: { typing: typingUsers }
			})

			// Уведомляем других участников о статусе печати
			await this.redisPubSubService.publishTypingStatus({
				chatId,
				userId: userIdStr,
				isTyping: data.isTyping,
				participants: chat.participants
			})
		} catch (error) {
			console.error('Ошибка при обновлении статуса печати:', error)
			throw error
		}
	}

	/**
	 * Получение списка чатов пользователя
	 */
	async getUserChats(userId: string): Promise<ChatPreview[]> {
		try {
		const userChats = await this.prismaService.userChat.findMany({
			where: { userId: userId },
				include: {
					chat: {
						include: {
							messages: {
								orderBy: { createdAt: 'desc' },
								take: 1
							}
						}
					}
				},
				orderBy: {
					chat: {
						lastMessageAt: 'desc'
					}
				}
			})

			const chatPreviews: ChatPreview[] = []

			for (const userChat of userChats) {
				const chat = userChat.chat
				const lastMessage = chat.messages[0]

				// Получаем информацию о другом участнике чата
				const otherParticipantId = chat.participants.find(
					id => id !== userId
				)
				if (!otherParticipantId) continue

				const otherUser = await this.prismaService.user.findUnique({
					where: { id: otherParticipantId }
				})

				if (!otherUser) continue

				// Подсчитываем непрочитанные сообщения
				const unreadCount = await this.prismaService.message.count({
					where: {
						chatId: chat.id,
						fromUserId: { not: userId },
						isRead: false
					}
				})

				chatPreviews.push({
					chatId: chat.id,
					toUser: {
						id: otherUser.id,
						name: otherUser.name,
						username: otherUser.username,
						division: otherUser.division,
						job: otherUser.job
					},
					lastMsg: lastMessage?.text || '',
					created_at:
						lastMessage?.createdAt.getTime() || chat.createdAt.getTime(),
					unread_count: unreadCount
				})
			}

			return chatPreviews
		} catch (error) {
			console.error('Ошибка при получении чатов пользователя:', error)
			throw error
		}
	}

	/**
	 * Проверка прав доступа к файлу
	 */
	async checkFileAccess(chatId: string, userId: string): Promise<boolean> {
		try {
			const chat = await this.prismaService.chat.findUnique({
				where: { id: chatId }
			})

			if (!chat) return false

			return chat.participants.includes(userId)
		} catch (error) {
			console.error('Ошибка при проверке прав доступа к файлу:', error)
			return false
		}
	}

	/**
	 * Получение пути к файлу
	 */
	getFilePath(chatId: string, filename: string): string {
		return this.storageService.getFilePath(chatId, filename)
	}

	/**
	 * Получение чата по ID
	 */
	async getChatById(chatId: string): Promise<any> {
		try {
			const chat = await this.prismaService.chat.findUnique({
				where: { id: chatId },
				include: {
					messages: {
						orderBy: { createdAt: 'desc' },
						take: 1
					}
				}
			})

			if (!chat) {
				throw new Error('Чат не найден')
			}

			return {
				id: chat.id,
				participants: chat.participants,
				created_at: chat.createdAt.getTime(),
				last_message_id: chat.lastMessageId,
				last_message_at: chat.lastMessageAt?.getTime() || chat.createdAt.getTime(),
				typing: chat.typing
			}
		} catch (error) {
			console.error('Ошибка при получении чата по ID:', error)
			throw error
		}
	}

	/**
	 * Удаление чата
	 */
	async deleteChat(chatId: string, userId: string): Promise<{ success: boolean; message: string }> {
		try {
			// Проверяем существование чата и участие пользователя
			const chat = await this.prismaService.chat.findUnique({
				where: { id: chatId }
			})

			if (!chat) {
				return { success: false, message: 'Чат не найден' }
			}

			if (!chat.participants.includes(userId)) {
				return { success: false, message: 'Вы не являетесь участником этого чата' }
			}

			// Удаляем чат и все связанные данные
			await this.prismaService.$transaction([
				this.prismaService.userChat.deleteMany({
					where: { chatId }
				}),
				this.prismaService.message.deleteMany({
					where: { chatId }
				}),
				this.prismaService.chat.delete({
					where: { id: chatId }
				})
			])

			return { success: true, message: 'Чат удален' }
		} catch (error) {
			console.error('Ошибка при удалении чата:', error)
			return { success: false, message: 'Ошибка при удалении чата' }
		}
	}

	/**
	 * Удаление чата пользователем
	 */
	async deleteChatByUser(chatId: string, userId: string): Promise<{ success: boolean; message: string }> {
		try {
			// Проверяем существование чата и участие пользователя
			const chat = await this.prismaService.chat.findUnique({
				where: { id: chatId }
			})

			if (!chat) {
				return { success: false, message: 'Чат не найден' }
			}

			if (!chat.participants.includes(userId)) {
				return { success: false, message: 'Вы не являетесь участником этого чата' }
			}

			// Удаляем только связь пользователя с чатом
			await this.prismaService.userChat.delete({
				where: {
					chatId_userId: {
						chatId,
						userId
					}
				}
			})

			// Если это был последний участник, удаляем весь чат
			const remainingUserChats = await this.prismaService.userChat.count({
				where: { chatId }
			})

			if (remainingUserChats === 0) {
				await this.prismaService.$transaction([
					this.prismaService.message.deleteMany({
						where: { chatId }
					}),
					this.prismaService.chat.delete({
						where: { id: chatId }
					})
				])
			}

			// Уведомляем других участников об удалении чата
			await this.redisPubSubService.publishChatDeleted({
				chatId,
				deletedByUserId: userId,
				participants: chat.participants,
				timestamp: Date.now()
			})

			return { success: true, message: 'Чат удален' }
		} catch (error) {
			console.error('Ошибка при удалении чата пользователем:', error)
			return { success: false, message: 'Ошибка при удалении чата' }
		}
	}

	/**
	 * Получение чатов с непрочитанными сообщениями
	 */
	async getChatsWithUnread(userId: string): Promise<string[]> {
		try {
			const userChats = await this.prismaService.userChat.findMany({
				where: { userId },
				include: {
					chat: {
						include: {
							messages: {
								where: {
									fromUserId: { not: userId },
									isRead: false
								}
							}
						}
					}
				}
			})

			const unreadChats = userChats
				.filter(userChat => userChat.chat.messages.length > 0)
				.map(userChat => userChat.chatId)

			return unreadChats
		} catch (error) {
			console.error('Ошибка при получении чатов с непрочитанными сообщениями:', error)
			return []
		}
	}

	/**
	 * Получение всех пользователей с непрочитанными сообщениями
	 */
	async getUsersWithUnreadMessages(): Promise<{ userId: string; unreadCount: number }[]> {
		try {
			const users = await this.prismaService.user.findMany({
				select: { id: true }
			})

			const usersWithUnread: { userId: string; unreadCount: number }[] = []

			for (const user of users) {
				const unreadCount = await this.prismaService.message.count({
					where: {
						chat: {
							userChats: {
								some: { userId: user.id }
							}
						},
						fromUserId: { not: user.id },
						isRead: false
					}
				})

				if (unreadCount > 0) {
					usersWithUnread.push({
						userId: user.id,
						unreadCount
					})
				}
			}

			return usersWithUnread
		} catch (error) {
			console.error('Ошибка при получении пользователей с непрочитанными сообщениями:', error)
			return []
		}
	}
}
