import { Injectable } from '@nestjs/common'
import { readFileSync } from 'fs'
import { PrismaService } from 'prisma/prisma.service'
import { EncryptionService } from 'src/encryption/encryption.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { NotificationService } from 'src/notification/notification.service'
import { title } from 'process'

@Injectable()
export class PostService {
	constructor(
		private prisma: PrismaService,
		private rsa: EncryptionService,
		private notificationService: NotificationService
	) {}

	async create(id: number, dto: CreatePostDto, file: Express.Multer.File) {
		try {
			const buffer = Buffer.from(readFileSync(file.path))

			if (!file || !buffer) {
				throw new Error('Файл не был загружен')
			}

			const data = await this.prisma.post.create({
				data: {
					title: dto.title,
					filename: file.filename,
					content: buffer,
					hash: 'hashexample',
					userId: id,
					delivered: false
				}
			})
			const payload = {
				title: data.title,
				filename: data.filename,
				hash: data.hash,
				date: data.date,
				content: buffer.toString('base64'),
				userId: data.userId,
				delivered: data.delivered
			}
			let description = "🚀Добавлен документ '" + data.title + "', ознакомьтесь" 
			await this.notificationService.create(data.date.toISOString(), description)


			return {
				result: 'success',
				data: payload
			}
		} catch (error) {
			return {
				result: 'failed',
				data: error.message || 'Не удалось создать пост'
			}
		}
	}

	async findAll(page: number, limit: number, req) {
		const skip = (page - 1) * limit
		const take = limit
	
		try {
			const posts = await this.prisma.post.findMany({
				skip,
				take,
				orderBy: { date: 'desc' },
				include: {
					signatures: {
						select: {
							hash: true,
							user: { select: { username: true, name: true } }
						}
					}
				}
			})
	
			const totalCount = await this.prisma.post.count()
			const scroll = totalCount - skip - take > 0
	
			const payloads = posts.map(post => {
				const isSigned = post.signatures.some(signature =>
					signature.user.username === req.user.username
				)
	
				return {
					id: post.id,
					title: post.title,
					filename: post.filename,
					date: post.date,
					sign: isSigned
				}
			})
	
			return {
				result: 'success',
				data: payloads,
				scroll
			}
		} catch (error) {
			return {
				result: 'failed',
				data: 'Посты не найдены'
			}
		}
	}
	

	async findOne(id: number, req) {
		try {
		  const post = await this.prisma.post.findFirst({
			where: { id },
			include: {
			  signatures: {
				select: {
				  hash: true,
				  user: { select: { id: true, username: true, name: true } }
				}
			  }
			}
		  })
	  
		  if (!post) {
			return {
			  result: 'failed',
			  code: `Пост с ID ${id} не найден`
			}
		  }
	  
		  const isSigned = post.signatures.some(signature =>
			signature.user.username === req.user.username
		  )
	  
		  const payload = {
			title: post.title,
			filename: post.filename,
			date: post.date,
			content: Buffer.from(post.content).toString('base64'),
			delivered: post.delivered,
			sign: isSigned
		  }
	  
		  return {
			result: 'success',
			data: payload
		  }
		} catch (error) {
		  return {
			result: 'failed',
			code: `Ошибка при получении поста с ID ${id}`
		  }
		}
	  }
	  
	async service(id: number) {
		return await this.prisma.post.findFirst({
			include: {
				signatures: {
					select: {
						hash: true,
						user: { select: { username: true, name: true } }
					}
				}
			},
			where: { id: id }
		})
	}

	async update(id: number, updatePostDto: UpdatePostDto) {
		try {
			const data = await this.prisma.post.update({
				data: updatePostDto,
				where: { id: id }
			})
			return {
				result: 'success',
				data: data
			}
		} catch (error) {
			return {
				result: 'failed',
				data: 'Ошибка при обновлении поста'
			}
		}
	}

	async remove(id: number) {
		try {
			const data = await this.prisma.post.delete({ where: { id: id } })
			console.log(data)
			return {
				result: 'success',
				data: data
			}
		} catch (error) {
			return {
				result: 'failed',
				data: `Пост с ID ${id} не найден`
			}
		}
	}
}
