import { Controller, Post, Get, Request, Query, UseGuards, ForbiddenException } from '@nestjs/common'
import { NotificationService } from './notification.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'


@UseGuards(JwtAuthGuard)
@Controller('notify')
export class NotificationController {
	constructor(private readonly notificationService: NotificationService) {}

	@Get()
	findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
			const pageNumber = parseInt(page || '1', 10)
			const limitNumber = parseInt(limit || '10', 10)
			return this.notificationService.findAll(pageNumber, limitNumber)
		}

	@Post()
	create(@Request() req) {
			if (req.user.role !== 'Admin') {
					throw new ForbiddenException('Not admin')
				}
			return this.notificationService.create(req.data.title, req.data.description)
		}

}

