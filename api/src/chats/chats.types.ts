// Интерфейсы типов данных
export interface Chat {
	id: string
	participants: string[]
	created_at: number
	last_message_id: string | null
	last_message_at: number // Timestamp последнего сообщения для сортировки
	typing?: string[] // Список ID пользователей, которые сейчас печатают
}

export interface UserChat {
	chatId: string
	userChat: string
	last_read_message_id: string | null
}

export interface ChatMsg {
	id: string
	chatId: string
	fromUser: string
	text: string
	created_at: number
	updated_at: number
	is_read: boolean
	media_type?: string
	media_url?: string
	fileName?: string
	fileSize?: number
	filePath?: string
}

// Типы ответов API
export interface ChatPreview {
	chatId: string
	toUser: {
		id: string
		name: string
		username: string
		division: string
		job: string
	}
	lastMsg: string
	created_at: number
	unread_count: number
}

export type ResFindAllChats = ChatPreview

export interface ResCreateChat {
	chatId: string
	toUser: string
}

export type ResUpdatedChat = Chat

export interface ChatsToUser {
	id: string
	writeStat: EWriteType
}

export enum EWriteType {
	None = 'None',
	Write = 'Write',
}

export enum SendChatsTcpPatterns {
	UpdatedChat = 'UpdatedChat',
	AddChat = 'AddChat',
	DeleteChat = 'DeleteChat',
}

// Дополнительные типы для микросервисных операций
export interface ConnectionDto {
	userId: string
	roomName: string
}

export interface MicroServiceResponse<T = any> {
	success: boolean
	data?: T
	message?: string
	error?: any
}
