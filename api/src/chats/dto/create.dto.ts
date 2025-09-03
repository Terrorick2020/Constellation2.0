import { IsString, IsNotEmpty } from 'class-validator'

export class CreateDto {
	@IsString()
	@IsNotEmpty()
	toUser: string
}
