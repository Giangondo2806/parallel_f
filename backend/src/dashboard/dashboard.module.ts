import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [
    // TODO: Add TypeORM module imports when implementing business logic
    // TypeOrmModule.forFeature([
    //   IdleResource,
    //   User,
    //   Department,
    //   UpdateHistory,
    // ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {}
