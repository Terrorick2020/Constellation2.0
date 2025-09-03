import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Put,
	Query,
	Request,
	Res,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'
import { multerConfig } from '../config/multer.config'
import { ChatsService } from './chats.service'
import type { ChatPreview, ResCreateChat } from './chats.types'
import { type ChatMsg } from './chats.types'
import { CreateDto } from './dto/create.dto'
import { GetMessagesDto } from './dto/get-messages.dto'
import { ReadMessagesDto } from './dto/read-messages.dto'
import { SendMessageWithFileDto } from './dto/send-message-with-file.dto'
import { SendMessageDto } from './dto/send-messages.dto'

@Controller('chats')
export class ChatsController {
	constructor(private readonly chatsService: ChatsService) {}

	@Post()
	async createChat(
		@Body() createDto: CreateDto,
		@Request() req: any
	): Promise<ResCreateChat> {
		const fromUserId = req.user.id
		const toUserId = parseInt(createDto.toUser)
		return await this.chatsService.createChat(fromUserId, toUserId)
	}

	@Get()
	async getUserChats(@Request() req: any): Promise<ChatPreview[]> {
		const userId = req.user.id
		return await this.chatsService.getUserChats(userId)
	}

	@Post(':chatId/messages')
	async sendMessage(
		@Param('chatId') chatId: string,
		@Body() messageData: SendMessageDto,
		@Request() req: any
	): Promise<ChatMsg> {
		const fromUserId = req.user.id
		return await this.chatsService.sendMessage(chatId, fromUserId, messageData)
	}

	@Get(':chatId/messages')
	async getMessages(
		@Param('chatId') chatId: string,
		@Query() query: GetMessagesDto,
		@Request() req: any
	): Promise<ChatMsg[]> {
		const userId = req.user.id
		return await this.chatsService.getMessages(chatId, userId, query)
	}

	@Put(':chatId/read')
	async markMessagesAsRead(
		@Param('chatId') chatId: string,
		@Body() readData: ReadMessagesDto,
		@Request() req: any
	): Promise<void> {
		const userId = req.user.id
		await this.chatsService.markMessagesAsRead(chatId, userId, readData)
	}

	/**
	 * Отправка сообщения с файлом
	 */
	@Post(':chatId/files')
	@UseInterceptors(FileInterceptor('file', multerConfig))
	async sendMessageWithFile(
		@Param('chatId') chatId: string,
		@UploadedFile() file: Express.Multer.File,
		@Body() messageData: SendMessageWithFileDto,
		@Request() req: any
	): Promise<ChatMsg> {
		const fromUserId = req.user.id
		return await this.chatsService.sendMessageWithFile(
			chatId,
			fromUserId,
			file,
			messageData
		)
	}

	/**
	 * Получение файла
	 */
	@Get('files/:chatId/:filename')
	async getFile(
		@Param('chatId') chatId: string,
		@Param('filename') filename: string,
		@Res() res: Response,
		@Request() req: any
	): Promise<void> {
		const userId = req.user.id

		// Проверяем права доступа к файлу
		const hasAccess = await this.chatsService.checkFileAccess(chatId, userId)
		if (!hasAccess) {
			res.status(403).json({ error: 'Доступ запрещен' })
			return
		}

		// Получаем путь к файлу
		const filePath = this.chatsService.getFilePath(chatId, filename)

		// Отправляем файл
		res.sendFile(filePath, { root: '.' })
	}
}
