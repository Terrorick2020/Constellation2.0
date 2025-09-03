import { IsString, IsOptional } from 'class-validator'

export class ReadMessagesDto {
	@IsString()
	@IsOptional()
	messageId?: string
}
