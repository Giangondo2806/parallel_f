import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';
import { IdleResource } from './idle-resource.entity';

export enum ActionType {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  CV_UPLOAD = 'CV_UPLOAD',
  CV_DELETE = 'CV_DELETE',
  BULK_UPDATE = 'BULK_UPDATE',
  IMPORT = 'IMPORT',
  EXPORT = 'EXPORT',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

@Entity('update_histories')
@Index('idx_resource_id', ['resourceId'])
@Index('idx_table_name', ['tableName'])
@Index('idx_action_type', ['actionType'])
@Index('idx_updated_by', ['updatedBy'])
@Index('idx_updated_at', ['updatedAt'])
export class UpdateHistory {
  @PrimaryGeneratedColumn({ name: 'history_id' })
  historyId: number;

  @Column({ 
    name: 'resource_id', 
    type: 'int', 
    nullable: true 
  })
  resourceId?: number;

  @Column({ 
    name: 'table_name', 
    type: 'varchar', 
    length: 100, 
    nullable: false 
  })
  tableName: string;

  @Column({ 
    name: 'action_type', 
    type: 'enum', 
    enum: ActionType, 
    nullable: false 
  })
  actionType: ActionType;

  @Column({ 
    name: 'old_values', 
    type: 'json', 
    nullable: true 
  })
  oldValues?: any;

  @Column({ 
    name: 'new_values', 
    type: 'json', 
    nullable: true 
  })
  newValues?: any;

  @Column({ 
    name: 'change_description', 
    type: 'varchar', 
    length: 500, 
    nullable: false 
  })
  changeDescription: string;

  @Column({ 
    name: 'updated_by', 
    type: 'int', 
    nullable: false 
  })
  updatedBy: number;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => IdleResource, (resource) => resource.updateHistories, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'resource_id' })
  resource?: IdleResource;

  @ManyToOne(() => User, (user) => user.updateHistories)
  @JoinColumn({ name: 'updated_by' })
  updatedByUser: User;

  // Virtual property for updated by name (will be populated through relation)
  get updatedByName(): string | undefined {
    return this.updatedByUser?.fullName || this.updatedByUser?.username;
  }

  // Virtual property for resource name (will be populated through relation)
  get resourceName(): string | undefined {
    return this.resource?.fullName;
  }
}
