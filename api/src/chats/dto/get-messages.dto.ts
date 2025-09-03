import { IsString, IsOptional, IsNumber, Min } from 'class-validator'
import { Type } from 'class-transformer'

export class GetMessagesDto {
	@IsString()
	@IsOptional()
	beforeMessageId?: string

	@IsNumber()
	@Min(1)
	@Type(() => Number)
	@IsOptional()
	limit?: number = 50
}
