import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { User } from './entities/user.entity';
import { Department } from './entities/department.entity';
import { IdleResource } from './entities/idle-resource.entity';
import { CVFile } from './entities/cv-file.entity';
import { UpdateHistory } from './entities/update-history.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'idle_resource_db',
      entities: [User, Department, IdleResource, CVFile, UpdateHistory],
      synchronize: process.env.NODE_ENV === 'development',
      logging: process.env.NODE_ENV === 'development',
    }),
    TypeOrmModule.forFeature([
      User,
      Department,
      IdleResource,
      CVFile,
      UpdateHistory,
    ]),
    AuthModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
