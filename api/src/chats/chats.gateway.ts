import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { ChatsService } from './chats.service'
import { SendMessageDto } from './dto/send-messages.dto'

@WebSocketGateway({
	cors: {
		origin: '*'
	}
})
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	server: Server

	private connectedUsers = new Map<string, Socket>()

	constructor(private readonly chatsService: ChatsService) {}

	handleConnection(client: Socket) {
		const userId = client.handshake.auth.userId
		if (userId) {
			this.connectedUsers.set(userId, client)
			client.join(`user:${userId}`)
			console.log(`Пользователь ${userId} подключился`)
		}
	}

	handleDisconnect(client: Socket) {
		const userId = client.handshake.auth.userId
		if (userId) {
			this.connectedUsers.delete(userId)
			client.leave(`user:${userId}`)
			console.log(`Пользователь ${userId} отключился`)
		}
	}

	@SubscribeMessage('join-chat')
	handleJoinChat(
		@MessageBody() chatId: string,
		@ConnectedSocket() client: Socket
	) {
		client.join(`chat:${chatId}`)
		console.log(`Пользователь присоединился к чату ${chatId}`)
	}

	@SubscribeMessage('leave-chat')
	handleLeaveChat(
		@MessageBody() chatId: string,
		@ConnectedSocket() client: Socket
	) {
		client.leave(`chat:${chatId}`)
		console.log(`Пользователь покинул чат ${chatId}`)
	}

	@SubscribeMessage('send-message')
	async handleSendMessage(
		@MessageBody() data: { chatId: string; message: SendMessageDto },
		@ConnectedSocket() client: Socket
	) {
		const userId = client.handshake.auth.userId
		if (!userId) return

		try {
		const message = await this.chatsService.sendMessage(
			data.chatId,
			userId,
			data.message
		)

			// Отправляем сообщение всем участникам чата
			this.server.to(`chat:${data.chatId}`).emit('new-message', message)
		} catch (error) {
			client.emit('error', { message: 'Ошибка при отправке сообщения' })
		}
	}

	@SubscribeMessage('send-file')
	async handleSendFile(
		@MessageBody()
		data: {
			chatId: string
			file: {
				buffer: Buffer
				originalname: string
				mimetype: string
				size: number
			}
			message: SendMessageDto
		},
		@ConnectedSocket() client: Socket
	) {
		const userId = client.handshake.auth.userId
		if (!userId) return

		try {
			// Создаем объект файла для multer
			const file: Express.Multer.File = {
				fieldname: 'file',
				originalname: data.file.originalname,
				encoding: '7bit',
				mimetype: data.file.mimetype,
				size: data.file.size,
				destination: '',
				filename: '',
				path: '',
				buffer: data.file.buffer,
				stream: null
			}

		const message = await this.chatsService.sendMessageWithFile(
			data.chatId,
			userId,
			file,
			{ text: data.message.text }
		)

			// Отправляем сообщение с файлом всем участникам чата
			this.server.to(`chat:${data.chatId}`).emit('new-message', message)
		} catch (error) {
			client.emit('error', { message: 'Ошибка при отправке файла' })
		}
	}

	@SubscribeMessage('typing')
	async handleTyping(
		@MessageBody() data: { chatId: string; isTyping: boolean },
		@ConnectedSocket() client: Socket
	) {
		const userId = client.handshake.auth.userId
		if (!userId) return

		try {
		await this.chatsService.updateTypingStatus(
			data.chatId,
			userId,
			{
				isTyping: data.isTyping
			}
		)

			// Уведомляем других участников о статусе печати
			client.to(`chat:${data.chatId}`).emit('user-typing', {
				userId,
				isTyping: data.isTyping
			})
		} catch (error) {
			client.emit('error', { message: 'Ошибка при обновлении статуса печати' })
		}
	}

	// Метод для отправки уведомлений о новых сообщениях
	notifyNewMessage(chatId: string, message: any) {
		this.server.to(`chat:${chatId}`).emit('new-message', message)
	}

	// Метод для отправки уведомлений о статусе печати
	notifyTypingStatus(chatId: string, userId: string, isTyping: boolean) {
		this.server.to(`chat:${chatId}`).emit('user-typing', { userId, isTyping })
	}
}
