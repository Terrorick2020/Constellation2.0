# Constellation2.0 WebSocket Server

Отдельный WebSocket сервер для обработки real-time событий в Constellation2.0.

## Описание

Этот модуль отвечает за:
- Обработку WebSocket соединений
- Подписку на Redis Pub/Sub события
- Отправку real-time уведомлений пользователям
- Микросервисную коммуникацию через TCP

## Архитектура

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   API Server    │    │  WebSocket WS   │    │     Redis       │
│  (Constellation)│    │    Server       │    │   Pub/Sub       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │ HTTP/REST             │ WebSocket             │ Pub/Sub
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Chats API     │───▶│  Redis Pub/Sub  │───▶│  WS Gateway     │
│                 │    │   Publishing    │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## События

### Входящие события (от клиентов):
- `join-chat` - присоединение к чату
- `leave-chat` - покидание чата

### Исходящие события (к клиентам):
- `new-message` - новое сообщение
- `message-read` - сообщение прочитано
- `user-typing` - статус набора текста
- `new-chat` - новый чат создан
- `chat-deleted` - чат удален
- `user-status` - изменение статуса пользователя

## Redis Pub/Sub каналы

- `chat:newMessage` - новое сообщение
- `chat:messageRead` - сообщение прочитано
- `chat:typing` - статус набора текста
- `chat:new` - новый чат
- `chat:deleted` - чат удален
- `user:status` - статус пользователя

## Запуск

### Локальная разработка:
```bash
npm install
npm run start:dev
```

### Production:
```bash
npm run build
npm run start:prod
```

### Docker:
```bash
docker build -t constellation-ws .
docker run -p 7000:7000 constellation-ws
```

## Конфигурация

Переменные окружения:
- `WS_PORT` - порт WebSocket сервера (по умолчанию: 7000)
- `TCP_PORT` - порт TCP микросервиса (по умолчанию: 7756)
- `REDIS_HOST` - хост Redis (по умолчанию: localhost)
- `REDIS_PORT` - порт Redis (по умолчанию: 6379)
- `REDIS_PASSWORD` - пароль Redis
- `REDIS_DB` - база данных Redis (по умолчанию: 0)

## Интеграция с клиентом

```javascript
import { io } from 'socket.io-client'

const socket = io('ws://localhost:7000/chats', {
  auth: {
    userId: 'user-id-here'
  }
})

// Присоединение к чату
socket.emit('join-chat', { chatId: 'chat-id' })

// Прослушивание новых сообщений
socket.on('new-message', (message) => {
  console.log('New message:', message)
})

// Прослушивание статуса набора текста
socket.on('user-typing', (data) => {
  console.log('User typing:', data)
})
```
