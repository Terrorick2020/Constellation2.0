import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator'

export class SendMessageWithFileDto {
	@IsString()
	@IsOptional()
	text?: string

	@IsString()
	@IsOptional()
	mediaType?: string

	@IsString()
	@IsOptional()
	fileName?: string

	@IsNumber()
	@IsOptional()
	@Min(1)
	@Max(100 * 1024 * 1024) // 100MB максимум
	fileSize?: number
}
