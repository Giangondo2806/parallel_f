import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';
import { Department } from './department.entity';
import { CVFile } from './cv-file.entity';
import { UpdateHistory } from './update-history.entity';

export enum ResourceStatus {
  AVAILABLE = 'Available',
  ASSIGNED = 'Assigned',
  ON_LEAVE = 'On Leave',
  TRAINING = 'Training',
}

@Entity('idle_resources')
@Index('idx_employee_code', ['employeeCode'], { unique: true })
@Index('idx_email', ['email'])
@Index('idx_department_id', ['departmentId'])
@Index('idx_status', ['status'])
@Index('idx_idle_from', ['idleFrom'])
@Index('idx_is_urgent', ['isUrgent'])
export class IdleResource {
  @PrimaryGeneratedColumn({ name: 'resource_id' })
  resourceId: number;

  @Column({ 
    name: 'employee_code', 
    type: 'varchar', 
    length: 20, 
    nullable: false, 
    unique: true 
  })
  employeeCode: string;

  @Column({ 
    name: 'full_name', 
    type: 'varchar', 
    length: 100, 
    nullable: false 
  })
  fullName: string;

  @Column({ 
    name: 'email', 
    type: 'varchar', 
    length: 100, 
    nullable: false 
  })
  email: string;

  @Column({ 
    name: 'phone', 
    type: 'varchar', 
    length: 20, 
    nullable: true 
  })
  phone?: string;

  @Column({ 
    name: 'job_title', 
    type: 'varchar', 
    length: 100, 
    nullable: true 
  })
  jobTitle?: string;

  @Column({ 
    name: 'skill_set', 
    type: 'varchar', 
    length: 200, 
    nullable: true 
  })
  skillSet?: string;

  @Column({ 
    name: 'department_id', 
    type: 'int', 
    nullable: false 
  })
  departmentId: number;

  @Column({ 
    name: 'idle_from', 
    type: 'date', 
    nullable: false 
  })
  idleFrom: Date;

  @Column({ 
    name: 'idle_to', 
    type: 'date', 
    nullable: true 
  })
  idleTo?: Date;

  @Column({ 
    name: 'status', 
    type: 'enum', 
    enum: ResourceStatus, 
    default: ResourceStatus.AVAILABLE 
  })
  status: ResourceStatus;

  @Column({ 
    name: 'process_note', 
    type: 'text', 
    nullable: true 
  })
  processNote?: string;

  @Column({ 
    name: 'rate', 
    type: 'varchar', 
    length: 20, 
    nullable: true 
  })
  rate?: string;

  @Column({ 
    name: 'is_urgent', 
    type: 'boolean', 
    default: false 
  })
  isUrgent: boolean;

  @Column({ 
    name: 'created_by', 
    type: 'int', 
    nullable: false 
  })
  createdBy: number;

  @Column({ 
    name: 'updated_by', 
    type: 'int', 
    nullable: false 
  })
  updatedBy: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => Department, (department) => department.idleResources)
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @ManyToOne(() => User, (user) => user.createdResources)
  @JoinColumn({ name: 'created_by' })
  createdByUser: User;

  @ManyToOne(() => User, (user) => user.updatedResources)
  @JoinColumn({ name: 'updated_by' })
  updatedByUser: User;

  @OneToMany(() => CVFile, (cv) => cv.resource)
  cvFiles: CVFile[];

  @OneToMany(() => UpdateHistory, (history) => history.resource)
  updateHistories: UpdateHistory[];

  // Virtual property for calculating idle duration in days
  get idleDuration(): number {
    const endDate = this.idleTo || new Date();
    const startDate = this.idleFrom;
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  // Virtual property for department name (will be populated through relation)
  get departmentName(): string | undefined {
    return this.department?.departmentName;
  }
}
