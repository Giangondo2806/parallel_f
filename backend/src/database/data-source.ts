import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { Department } from '../entities/department.entity';
import { IdleResource } from '../entities/idle-resource.entity';
import { CVFile } from '../entities/cv-file.entity';
import { UpdateHistory } from '../entities/update-history.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'idle_resource_db',
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  entities: [User, Department, IdleResource, CVFile, UpdateHistory],
  migrations: ['src/database/migrations/*.ts'],
  subscribers: ['src/database/subscribers/*.ts'],
});
