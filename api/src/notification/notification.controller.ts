import { Controller, Post, Get, Request, Query } from '@nestjs/common'
import { NotificationService } from './notification.service'



@Controller('notify')
export class NotificationController {
	constructor(private readonly notificationService: NotificationService) {}

	findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
			const pageNumber = parseInt(page || '1', 10)
			const limitNumber = parseInt(limit || '10', 10)
			return this.notificationService.findAll(pageNumber, limitNumber)
		}

	@Post()
	create(@Request() req) {
			return this.notificationService.create(req.data.title, req.data.description)
		}

}

