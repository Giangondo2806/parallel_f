import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdleResource } from '../entities/idle-resource.entity';
import { Department } from '../entities/department.entity';
import { CVFile } from '../entities/cv-file.entity';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.service';
import { CVService } from './cv.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([IdleResource, Department, CVFile]),
  ],
  controllers: [ResourcesController],
  providers: [ResourcesService, CVService],
  exports: [ResourcesService, CVService],
})
export class ResourcesModule {}
