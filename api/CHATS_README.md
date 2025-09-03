# Модуль чатов для проекта v2

Этот модуль предоставляет функциональность для обмена сообщениями между пользователями в реальном времени.

## Особенности

- **Постоянное хранение**: В отличие от исходного проекта, где чаты удалялись через 24 часа, в v2 все сообщения сохраняются навсегда
- **WebSocket поддержка**: Реальное время обмена сообщениями
- **База данных**: Все данные хранятся в PostgreSQL через Prisma
- **Redis**: Используется для уведомлений и кэширования

## Структура базы данных

### Таблица `chats`

- `id` - уникальный идентификатор чата
- `participants` - массив ID участников чата
- `created_at` - дата создания чата
- `updated_at` - дата последнего обновления
- `last_message_id` - ID последнего сообщения
- `last_message_at` - дата последнего сообщения
- `typing` - массив ID пользователей, которые печатают

### Таблица `messages`

- `id` - уникальный идентификатор сообщения
- `chat_id` - ID чата
- `from_user_id` - ID отправителя
- `text` - текст сообщения
- `media_type` - тип медиа (опционально)
- `media_url` - URL медиа (опционально)
- `is_read` - прочитано ли сообщение
- `created_at` - дата создания
- `updated_at` - дата обновления

### Таблица `user_chats`

- `id` - уникальный идентификатор
- `chat_id` - ID чата
- `user_id` - ID пользователя
- `last_read_message_id` - ID последнего прочитанного сообщения
- `created_at` - дата создания
- `updated_at` - дата обновления

## API Endpoints

### REST API

#### Создание чата

```
POST /chats
Body: { "toUser": "123" }
```

#### Получение списка чатов пользователя

```
GET /chats
```

#### Отправка сообщения

```
POST /chats/:chatId/messages
Body: { "text": "Привет!" }
```

#### Получение сообщений чата

```
GET /chats/:chatId/messages?limit=50&beforeMessageId=abc123
```

#### Отметка сообщений как прочитанных

```
PUT /chats/:chatId/read
Body: { "messageId": "abc123" } // опционально
```

### WebSocket Events

#### Подключение к чату

```javascript
socket.emit('join-chat', 'chat-id')
```

#### Отключение от чата

```javascript
socket.emit('leave-chat', 'chat-id')
```

#### Отправка сообщения

```javascript
socket.emit('send-message', {
	chatId: 'chat-id',
	message: { text: 'Привет!' }
})
```

#### Статус печати

```javascript
socket.emit('typing', {
	chatId: 'chat-id',
	isTyping: true
})
```

#### Получение новых сообщений

```javascript
socket.on('new-message', message => {
	console.log('Новое сообщение:', message)
})
```

#### Получение статуса печати

```javascript
socket.on('user-typing', data => {
	console.log('Пользователь печатает:', data)
})
```

## Установка и настройка

1. Установите зависимости:

```bash
npm install
```

2. Настройте переменные окружения в `.env`:

```
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
REDIS_URL="redis://localhost:6379"
```

3. Создайте миграции базы данных:

```bash
npx prisma migrate dev
```

4. Запустите приложение:

```bash
npm run start:dev
```

## Использование в клиентском приложении

### Подключение к WebSocket

```javascript
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000', {
	auth: {
		userId: '123' // ID пользователя
	}
})
```

### Пример использования API

```javascript
// Создание чата
const response = await fetch('/chats', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		Authorization: 'Bearer your-jwt-token'
	},
	body: JSON.stringify({
		toUser: '456'
	})
})

// Получение сообщений
const messages = await fetch('/chats/chat-id/messages', {
	headers: {
		Authorization: 'Bearer your-jwt-token'
	}
})
```

## Отличия от исходного проекта

1. **Постоянное хранение**: Убрана логика TTL и автоматической очистки чатов
2. **База данных**: Все данные хранятся в PostgreSQL вместо Redis
3. **Упрощенная архитектура**: Убраны сложные механизмы кэширования и очистки
4. **Адаптация под v2**: Изменены типы пользователей и структура данных под проект v2

## Безопасность

- Все API endpoints требуют аутентификации
- WebSocket соединения проверяют userId в auth
- Валидация входных данных через DTO
- Проверка прав доступа к чатам
