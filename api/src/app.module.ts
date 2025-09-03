import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AdminModule } from './admin/admin.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { ChatsModule } from './chats/chats.module'
import { EncryptionService } from './encryption/encryption.service'
import { NotificationModule } from './notification/notification.module'
import { PostModule } from './post/post.module'
import { SignatureModule } from './signature/signature.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		UserModule,
		PostModule,
		SignatureModule,
		AuthModule,
		AdminModule,
		NotificationModule,
		ChatsModule,
		ConfigModule.forRoot()
	],
	controllers: [AppController],
	providers: [AppService, EncryptionService]
})
export class AppModule {}
