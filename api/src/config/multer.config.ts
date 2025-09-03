import { diskStorage } from 'multer'
import { extname } from 'path'
import { v4 as uuidv4 } from 'uuid'

export const multerConfig = {
	storage: diskStorage({
		destination: './uploads/temp',
		filename: (req, file, cb) => {
			const randomName = uuidv4()
			const fileExtension = extname(file.originalname)
			cb(null, `${randomName}${fileExtension}`)
		}
	}),
	limits: {
		fileSize: 100 * 1024 * 1024, // 100MB максимум
		files: 1 // только один файл за раз
	},
	fileFilter: (req, file, cb) => {
		// Разрешенные типы файлов
		const allowedMimeTypes = [
			// Изображения
			'image/jpeg',
			'image/png',
			'image/gif',
			'image/webp',
			'image/svg+xml',
			// Видео
			'video/mp4',
			'video/webm',
			'video/ogg',
			'video/avi',
			'video/mov',
			// Аудио
			'audio/mpeg',
			'audio/wav',
			'audio/ogg',
			'audio/mp3',
			'audio/aac',
			// Документы
			'application/pdf',
			'application/msword',
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			'application/vnd.ms-excel',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			'text/plain',
			'text/csv'
		]

		if (allowedMimeTypes.includes(file.mimetype)) {
			cb(null, true)
		} else {
			cb(new Error('Неподдерживаемый тип файла'), false)
		}
	}
}
