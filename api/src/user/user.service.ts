import { Injectable } from '@nestjs/common'
import * as argon from 'argon2'
import { PrismaService } from 'prisma/prisma.service'
import { RegisterDto } from 'src/auth/dto/register.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}
	async create(register: RegisterDto) {
		const hashedPassword = await argon.hash(register.password)
		await this.prisma.post.updateMany({
			data: {
				delivered: false
			}
		})
		return this.prisma.user.create({
			data: {
				username: register.username,
				name: register.name,
				password: hashedPassword,
				division: register.division,
				job: register.job
			}
		})
	}

	findAll() {
		return this.prisma.user.findMany({ omit: { password: true } })
	}

	async getSubs(postId: number) {
		try {
			const users = await this.prisma.user.findMany({
				where: {role: 'Guest'},
				select: {
					id: true,
					name: true
				},
			})
	
			const signedUsers = await this.prisma.signature.findMany({
				where: {
					postId: postId
				},
				select: {
					userId: true,
					assignedAt: true
				}
			})
	
			const signedMap = new Map<string, Date>()
			for (const sig of signedUsers) {
				signedMap.set(sig.userId, sig.assignedAt)
			}
	
			const result = users.map(user => {
				const signedDate = signedMap.get(user.id)
				return {
					id: user.id,
					name: user.name,
					signed: signedDate !== undefined,
					assignedAt: signedDate
						? new Date(signedDate).toLocaleDateString('ru-RU')
						: null
				}
			})
	
			return {
				result: 'success',
				data: result
			}
		} catch (err) {
			return {
				result: 'failed',
				data: err.message
			}
		}
	}
	
	

	findOne(id: string) {
		return this.prisma.user.findFirst({
			where: { id },
			omit: { password: true }
		})
	}
	findByUsername(username: string) {
		return this.prisma.user.findFirst({ where: { username } })
	}
	update(id: string, updateUserDto: UpdateUserDto) {
		return this.prisma.user.update({
			data: updateUserDto,
			where: { id },
			omit: { password: true }
		})
	}
	setAdmin(id: string) {
		return this.prisma.user.update({
			data: { role: 'Admin' },
			where: { id },
			omit: { password: true }
		})
	}

	remove(id: string) {
		return this.prisma.user.delete({ where: { id }, omit: { password: true } })
	}
}
