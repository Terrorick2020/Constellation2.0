import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as argon from 'argon2'
import { EncryptionService } from 'src/encryption/encryption.service'
import { UserService } from 'src/user/user.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
@Injectable()
export class AuthService {
	constructor(
		private rsa: EncryptionService,
		private usersService: UserService,
		private readonly jwtService: JwtService
	) {}

	async register(register: RegisterDto) {
		const user = await this.usersService.findByUsername(register.username)
		if (user) {
			return {
				result: 'failed',
				data: 'Пользователь с таким логином уже существует'
			}
		}

		if (register.password !== register.repass) {
			return {
				result: 'failed',
				data: 'Пароли не совпадают'
			}
		}
		const reg = await this.usersService.create(register)

		const { publicKey } = await this.rsa.generateKeys(
			register.username,
			register.password
		)

		const payload = {
			id: reg.id,
			username: String(reg.username),
			role: reg.role
		}

		return {
			result: 'success',
			data: payload,
			token: await this.jwtService.signAsync(payload),
			keyPath: `/auth/public-key/${register.username}`
		}
	}

	async login(loginDto: LoginDto) {
		const user = await this.usersService.findByUsername(loginDto.username)
		if (!user) throw new UnauthorizedException('Неверное имя пользователя')
		const isValid = await argon.verify(user.password, loginDto.password)

		if (!isValid) {
			return {
				result: 'failed',
				data: 'Неверный пароль'
			}
		}
		const payload = {
			id: user.id,
			username: String(user.username),
			role: user.role
		}
		return {
			result: 'success',
			data: payload,
			access_token: await this.jwtService.signAsync(payload)
		}
	}
	async profile(req) {
		const user = await this.usersService.findOne(req.user.userId)
		if (!user) throw new UnauthorizedException('Неверное имя пользователя')
		const { ...data } = user
		return data
	}

	async reset(username: string, file: Express.Multer.File, newPass: string) {
		try {
			const user = await this.usersService.findByUsername(username)
			if (!user) {
				return {
					result: 'failed',
					data: 'Пользователь с таким логином не найден'
				}
			}

			const key = Buffer.from(file.buffer).toLocaleString()

			const hash = this.rsa.encrypt(username, key)
			const check = this.rsa.checkSignature(username, hash)
			if (check != username)
				return {
					result: 'failed',
					data: 'Неверный ключ!'
				}

			let changeUser = await this.usersService.findByUsername(username)
			const hashedPassword = await argon.hash(newPass)
			await this.usersService.update(changeUser.id, {
				password: hashedPassword
			})
			return {
				result: 'success',
				data: 'Пароль обновлен!'
			}
		} catch (error) {
			return {
				result: 'failed',
				data: error
			}
		}
	}
}
