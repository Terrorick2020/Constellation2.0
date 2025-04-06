import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';
import { EncryptionService } from 'src/encryption/encryption.service';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [PrismaModule, MulterModule, NotificationModule],
  controllers: [PostController],
  providers: [PostService, EncryptionService, NotificationService],
  exports: [PostService],
})
export class PostModule {}
