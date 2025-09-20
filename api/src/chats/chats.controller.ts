import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    Request,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { multerConfig } from '../config/multer.config'
import { ChatsService } from './chats.service'
import type { Chat, ChatPreview, ResCreateChat } from './chats.types'
import { type ChatMsg } from './chats.types'
import { CreateDto } from './dto/create.dto'
import { DeleteChatDto } from './dto/delete-chat.dto'
import { GetMessagesDto } from './dto/get-messages.dto'
import { ReadMessagesDto } from './dto/read-messages.dto'
import { SendMessageWithFileDto } from './dto/send-message-with-file.dto'
import { SendMessageDto } from './dto/send-messages.dto'
import { TypingStatusDto } from './dto/typing-status.dto'

@ApiTags('chats')
@UseGuards(JwtAuthGuard)
@Controller('chats')
export class ChatsController {
	constructor(private readonly chatsService: ChatsService) {}

	@Post()
	async createChat(
		@Body() createDto: CreateDto,
		@Request() req: any
	): Promise<ResCreateChat> {
		const fromUserId = req.user.userId
		const toUserId = createDto.toUser
		console.log('DEBUG: Controller - fromUserId:', fromUserId, 'type:', typeof fromUserId)
		console.log('DEBUG: Controller - toUserId:', toUserId, 'type:', typeof toUserId)
		console.log('DEBUG: Controller - createDto:', createDto)
		console.log('DEBUG: Controller - req.body:', req.body)
		
		// Проверяем, что toUser передан
		if (!toUserId) {
			throw new Error('Поле toUser обязательно для заполнения');
		}
		
		return await this.chatsService.createChat(fromUserId, toUserId)
	}

	@Get()
	async getUserChats(@Request() req: any): Promise<ChatPreview[]> {
		const userId = req.user.userId
		return await this.chatsService.getUserChats(userId)
	}

	@Post(':chatId/messages')
	async sendMessage(
		@Param('chatId') chatId: string,
		@Body() messageData: SendMessageDto,
		@Request() req: any
	): Promise<ChatMsg> {
		const fromUserId = req.user.userId
		return await this.chatsService.sendMessage(chatId, fromUserId, messageData)
	}

	@Get(':chatId/messages')
	async getMessages(
		@Param('chatId') chatId: string,
		@Query() query: GetMessagesDto,
		@Request() req: any
	): Promise<ChatMsg[]> {
		const userId = req.user.userId
		return await this.chatsService.getMessages(chatId, userId, query)
	}

	@Put(':chatId/read')
	async markMessagesAsRead(
		@Param('chatId') chatId: string,
		@Body() readData: ReadMessagesDto,
		@Request() req: any
	): Promise<void> {
		const userId = req.user.userId
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
		const fromUserId = req.user.userId
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
		const userId = req.user.userId

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

	@ApiOperation({ summary: 'Получить метаданные чата' })
	@ApiResponse({ status: 200, description: 'Метаданные чата получены' })
	@Get(':chatId/metadata')
	async getChatMetadata(
		@Param('chatId') chatId: string,
		@Request() req: any
	): Promise<Chat> {
		const userId = req.user.userId
		return await this.chatsService.getChatById(chatId)
	}

	@ApiOperation({ summary: 'Удалить чат' })
	@ApiResponse({ status: 200, description: 'Чат удален' })
	@Delete(':chatId')
	async deleteChat(
		@Param('chatId') chatId: string,
		@Request() req: any
	): Promise<{ success: boolean; message: string }> {
		const userId = req.user.userId
		return await this.chatsService.deleteChat(chatId, userId)
	}

	@ApiOperation({ summary: 'Удалить чат конкретным пользователем' })
	@ApiResponse({ status: 200, description: 'Чат удален пользователем' })
	@Delete(':chatId/by-user')
	async deleteChatByUser(
		@Param('chatId') chatId: string,
		@Body() deleteChatDto: DeleteChatDto,
		@Request() req: any
	): Promise<{ success: boolean; message: string }> {
		const userId = req.user.userId
		return await this.chatsService.deleteChatByUser(chatId, userId)
	}

	@ApiOperation({ summary: 'Получить количество непрочитанных чатов' })
	@ApiResponse({ status: 200, description: 'Количество получено' })
	@Get('unread-chats-count')
	async getUnreadChatsCount(@Request() req: any): Promise<string[]> {
		const userId = req.user.userId
		return await this.chatsService.getChatsWithUnread(userId)
	}

	@ApiOperation({ summary: 'Получить всех пользователей с непрочитанными сообщениями' })
	@ApiResponse({ status: 200, description: 'Список пользователей получен' })
	@Get('users-with-unread')
	async getUsersWithUnreadMessages(): Promise<{ userId: string; unreadCount: number }[]> {
		return await this.chatsService.getUsersWithUnreadMessages()
	}

	@ApiOperation({ summary: 'Обновить статус набора текста' })
	@ApiResponse({ status: 200, description: 'Статус набора текста обновлен' })
	@Post('typing')
	async updateTypingStatus(
		@Body() typingStatusDto: TypingStatusDto,
		@Request() req: any
	): Promise<void> {
		const userId = req.user.userId
		await this.chatsService.updateTypingStatus(
			typingStatusDto.chatId,
			userId,
			typingStatusDto
		)
	}
}
