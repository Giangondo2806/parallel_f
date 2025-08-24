import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.service';
import { IdleResource } from '../entities/idle-resource.entity';
import { Department } from '../entities/department.entity';
import { CVFile } from '../entities/cv-file.entity';
import { UpdateHistory } from '../entities/update-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      IdleResource,
      Department,
      CVFile,
      UpdateHistory,
    ]),
  ],
  controllers: [ResourcesController],
  providers: [ResourcesService],
  exports: [ResourcesService],
})
export class ResourcesModule {}
