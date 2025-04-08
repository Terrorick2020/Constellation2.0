import { Injectable } from '@nestjs/common'
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'
import { PrismaService } from 'prisma/prisma.service'

@WebSocketGateway({
	cors: {
		origin: '*'
	}
})
@Injectable()
export class NotificationService {
	@WebSocketServer()
	server: Server

	constructor(private prisma: PrismaService) {}

	async findAll(page: number, limit: number) {
		const skip = (page - 1) * limit
		const take = limit

		try {
			const notifications = await this.prisma.notification.findMany({
				skip: skip,
				take: take,
			})
			const scroll =
				(await this.prisma.notification.findMany()).length - skip * take > 0
			const payloads = notifications.map(notification => ({
				id: notification.id,
				title: notification.title,
				description: notification.description 
			}))

			return {
				result: 'success',
				data: payloads,
				scroll: scroll
			}
		} catch (error) {
			return {
				result: 'failed',
				data: 'Уведомления не найдены'
			}
		}
	}

	async create(title: string, description: string) {
		try {

			const notification = await this.prisma.notification.create({
				data: { title: title, description: description }
			})

			this.server.emit('new_notification', notification)

			return {
				result: 'success',
				data: notification
			}
		} catch (error) {
			return {
				result: 'failed',
				data: error.message || 'Не удалось создать уведомление'
			}
		}
	}
}
