import { Injectable } from '@nestjs/common'
import { mkdir, unlink, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import { extname, join } from 'path'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class StorageService {
	private readonly uploadsDir = 'uploads'
	private readonly chatFilesDir = 'chat-files'

	/**
	 * Сохранение файла чата
	 */
	async saveChatFile(
		chatId: string,
		file: Express.Multer.File,
		fileType: 'image' | 'video' | 'audio' | 'document'
	): Promise<{ filename: string; path: string; url: string }> {
		try {
			// Создаем директорию для чата
			const chatDir = join(this.uploadsDir, this.chatFilesDir, chatId)
			await mkdir(chatDir, { recursive: true })

			// Генерируем уникальное имя файла
			const fileExtension = extname(file.originalname)
			const filename = `${fileType}-${uuidv4()}${fileExtension}`
			const filePath = join(chatDir, filename)

			// Сохраняем файл
			await writeFile(filePath, file.buffer)

			// Формируем URL для доступа к файлу
			const fileUrl = `/uploads/chat-files/${chatId}/${filename}`

			return {
				filename,
				path: filePath,
				url: fileUrl
			}
		} catch (error) {
			console.error('Ошибка при сохранении файла:', error)
			throw error
		}
	}

	/**
	 * Удаление файла
	 */
	async deleteFile(filePath: string): Promise<void> {
		try {
			if (existsSync(filePath)) {
				await unlink(filePath)
			}
		} catch (error) {
			console.error('Ошибка при удалении файла:', error)
			throw error
		}
	}

	/**
	 * Получение полного пути к файлу
	 */
	getFilePath(chatId: string, filename: string): string {
		return join(this.uploadsDir, this.chatFilesDir, chatId, filename)
	}

	/**
	 * Проверка существования файла
	 */
	async fileExists(filePath: string): Promise<boolean> {
		return existsSync(filePath)
	}
}
