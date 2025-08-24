import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { Department } from './entities/department.entity';
import { IdleResource } from './entities/idle-resource.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    @InjectRepository(IdleResource)
    private readonly resourceRepository: Repository<IdleResource>,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  async getHealth() {
    try {
      const userCount = await this.userRepository.count();
      const departmentCount = await this.departmentRepository.count();
      const resourceCount = await this.resourceRepository.count();
      const urgentResources = await this.resourceRepository.count({ where: { isUrgent: true } });

      return {
        status: 'OK',
        database: 'Connected',
        timestamp: new Date().toISOString(),
        statistics: {
          users: userCount,
          departments: departmentCount,
          totalResources: resourceCount,
          urgentResources: urgentResources,
        },
      };
    } catch (error) {
      return {
        status: 'ERROR',
        database: 'Disconnected',
        timestamp: new Date().toISOString(),
        error: error.message,
      };
    }
  }
}
