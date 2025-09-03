# Передача файлов в чатах

Этот документ описывает реализацию передачи файлов (изображений, видео, аудио, документов) в чатах.

## Поддерживаемые типы файлов

### Изображения

- JPEG, PNG, GIF, WebP, SVG

### Видео

- MP4, WebM, OGG, AVI, MOV

### Аудио

- MP3, WAV, OGG, AAC

### Документы

- PDF, DOC, DOCX, XLS, XLSX, TXT, CSV

## Ограничения

- **Максимальный размер файла**: 100MB
- **Количество файлов**: 1 файл за раз
- **Хранение**: Файлы сохраняются локально в папке `uploads/chat-files/`

## API Endpoints

### Отправка файла

```
POST /chats/:chatId/files
Content-Type: multipart/form-data

Form Data:
- file: [файл]
- text: "Описание файла" (опционально)
```

### Получение файла

```
GET /chats/files/:chatId/:filename
```

## WebSocket Events

### Отправка файла через WebSocket

```javascript
socket.emit('send-file', {
	chatId: 'chat-id',
	file: {
		buffer: fileBuffer, // Buffer файла
		originalname: 'photo.jpg', // Оригинальное имя
		mimetype: 'image/jpeg', // MIME тип
		size: 1024000 // Размер в байтах
	},
	message: {
		text: 'Описание файла'
	}
})
```

### Получение сообщения с файлом

```javascript
socket.on('new-message', message => {
	if (message.media_type) {
		// Это сообщение с файлом
		console.log('Файл:', message.media_url)
		console.log('Тип:', message.media_type)
		console.log('Имя файла:', message.fileName)
		console.log('Размер:', message.fileSize)
	}
})
```

## Структура хранения файлов

```
uploads/
├── chat-files/
│   ├── chat-123/
│   │   ├── image-abc123.jpg
│   │   ├── video-def456.mp4
│   │   └── audio-ghi789.mp3
│   └── chat-456/
│       └── document-jkl012.pdf
└── temp/                    # Временные файлы
```

## Примеры использования

### Отправка изображения через REST API

```javascript
const formData = new FormData()
formData.append('file', imageFile)
formData.append('text', 'Мое фото')

const response = await fetch('/chats/chat-123/files', {
	method: 'POST',
	headers: {
		Authorization: 'Bearer your-jwt-token'
	},
	body: formData
})

const message = await response.json()
console.log('Файл отправлен:', message.media_url)
```

### Отправка файла через WebSocket

```javascript
// Читаем файл как Buffer
const fileBuffer = await file.arrayBuffer()

socket.emit('send-file', {
	chatId: 'chat-123',
	file: {
		buffer: Buffer.from(fileBuffer),
		originalname: file.name,
		mimetype: file.type,
		size: file.size
	},
	message: {
		text: 'Документ для вас'
	}
})
```

### Отображение файла в чате

```javascript
socket.on('new-message', message => {
	if (message.media_type) {
		const fileUrl = `http://localhost:3000/chats/files/${message.chatId}/${message.fileName}`

		if (message.media_type.startsWith('image/')) {
			// Показываем изображение
			displayImage(fileUrl, message.text)
		} else if (message.media_type.startsWith('video/')) {
			// Показываем видео
			displayVideo(fileUrl, message.text)
		} else if (message.media_type.startsWith('audio/')) {
			// Показываем аудио плеер
			displayAudio(fileUrl, message.text)
		} else {
			// Показываем ссылку на документ
			displayDocument(fileUrl, message.fileName, message.text)
		}
	}
})
```

## Безопасность

1. **Проверка прав доступа**: Только участники чата могут загружать и скачивать файлы
2. **Валидация типов**: Проверяется MIME-тип файла
3. **Ограничение размера**: Максимальный размер 100MB
4. **Уникальные имена**: Файлы переименовываются для избежания конфликтов

## Обработка ошибок

### Ошибки загрузки

```javascript
socket.on('error', error => {
	if (error.message === 'Ошибка при отправке файла') {
		console.error('Файл слишком большой или неподдерживаемый тип')
	}
})
```

### Ошибки доступа

```javascript
// При попытке скачать файл без прав доступа
fetch('/chats/files/chat-123/file.jpg').then(response => {
	if (response.status === 403) {
		console.error('Доступ запрещен')
	}
})
```

## Альтернативные решения

### 1. **Облачное хранение (AWS S3, Google Cloud Storage)**

- Преимущества: Масштабируемость, надежность
- Недостатки: Стоимость, сложность настройки

### 2. **CDN для статических файлов**

- Преимущества: Быстрая доставка, кэширование
- Недостатки: Дополнительная инфраструктура

### 3. **База данных (BLOB)**

- Преимущества: Простота, транзакционность
- Недостатки: Размер БД, производительность

## Рекомендации по использованию

1. **Сжатие изображений** перед отправкой
2. **Конвертация видео** в WebM для веб-плееров
3. **Предварительный просмотр** для изображений
4. **Прогресс-бар** для больших файлов
5. **Очистка старых файлов** по расписанию
