import { Injectable, Logger } from '@nestjs/common'
import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

@WebSocketGateway({
	namespace: 'chats',
	cors: {
		origin: '*',
	},
})
@Injectable()
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	server: Server

	private readonly logger = new Logger(ChatsGateway.name)
	private connectedUsers = new Map<string, Socket>()

	handleConnection(client: Socket) {
		const userId = client.handshake.auth.userId
		if (userId) {
			this.connectedUsers.set(userId, client)
			client.join(`user:${userId}`)
			this.logger.log(`User ${userId} connected to chats namespace`)
		}
	}

	handleDisconnect(client: Socket) {
		const userId = client.handshake.auth.userId
		if (userId) {
			this.connectedUsers.delete(userId)
			client.leave(`user:${userId}`)
			this.logger.log(`User ${userId} disconnected from chats namespace`)
		}
	}

	@SubscribeMessage('join-chat')
	handleJoinChat(
		@MessageBody() data: { chatId: string },
		@ConnectedSocket() client: Socket
	) {
		client.join(`chat:${data.chatId}`)
		this.logger.debug(`User joined chat ${data.chatId}`)
	}

	@SubscribeMessage('leave-chat')
	handleLeaveChat(
		@MessageBody() data: { chatId: string },
		@ConnectedSocket() client: Socket
	) {
		client.leave(`chat:${data.chatId}`)
		this.logger.debug(`User left chat ${data.chatId}`)
	}

	// Методы для отправки уведомлений
	sendNewMessageNotification(userId: string, messageData: any) {
		const client = this.connectedUsers.get(userId)
		if (client) {
			client.emit('new-message', messageData)
			this.logger.debug(`Sent new message notification to user ${userId}`)
		}
	}

	sendMessageReadNotification(userId: string, readData: any) {
		const client = this.connectedUsers.get(userId)
		if (client) {
			client.emit('message-read', readData)
			this.logger.debug(`Sent message read notification to user ${userId}`)
		}
	}

	sendTypingStatusNotification(participants: string[], userId: string, isTyping: boolean) {
		participants.forEach(participantId => {
			if (participantId !== userId) {
				const client = this.connectedUsers.get(participantId)
				if (client) {
					client.emit('user-typing', {
						userId,
						isTyping
					})
					this.logger.debug(`Sent typing status to user ${participantId}`)
				}
			}
		})
	}

	sendNewChatNotification(userId: string, chatData: any) {
		const client = this.connectedUsers.get(userId)
		if (client) {
			client.emit('new-chat', chatData)
			this.logger.debug(`Sent new chat notification to user ${userId}`)
		}
	}

	sendChatDeletedNotification(participants: string[], deleteData: any) {
		participants.forEach(userId => {
			const client = this.connectedUsers.get(userId)
			if (client) {
				client.emit('chat-deleted', deleteData)
				this.logger.debug(`Sent chat deleted notification to user ${userId}`)
			}
		})
	}

	sendUserStatusNotification(notifyUsers: string[], statusData: any) {
		notifyUsers.forEach(userId => {
			const client = this.connectedUsers.get(userId)
			if (client) {
				client.emit('user-status', statusData)
				this.logger.debug(`Sent user status notification to user ${userId}`)
			}
		})
	}

	// Вспомогательные методы
	isUserOnline(userId: string): boolean {
		return this.connectedUsers.has(userId)
	}

	getOnlineUsers(): string[] {
		return Array.from(this.connectedUsers.keys())
	}

	sendToUser(userId: string, event: string, data: any) {
		const client = this.connectedUsers.get(userId)
		if (client) {
			client.emit(event, data)
		}
	}

	sendToRoom(room: string, event: string, data: any) {
		this.server.to(room).emit(event, data)
	}
}
