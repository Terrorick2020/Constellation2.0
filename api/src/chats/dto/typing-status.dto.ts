import { IsBoolean, IsNotEmpty } from 'class-validator'

export class TypingStatusDto {
	@IsBoolean()
	@IsNotEmpty()
	isTyping: boolean
}
