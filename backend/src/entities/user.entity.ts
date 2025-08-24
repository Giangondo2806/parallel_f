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
import { IdleResource } from './idle-resource.entity';
import { CVFile } from './cv-file.entity';
import { UpdateHistory } from './update-history.entity';
import { Department } from './department.entity';

export enum UserRole {
  ADMIN = 'Admin',
  RA = 'RA',
  MANAGER = 'Manager',
  VIEWER = 'Viewer',
}

@Entity('users')
@Index('idx_username', ['username'], { unique: true })
@Index('idx_email', ['email'], { unique: true })
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column({ 
    name: 'username', 
    type: 'varchar', 
    length: 50, 
    nullable: false, 
    unique: true 
  })
  username: string;

  @Column({ 
    name: 'email', 
    type: 'varchar', 
    length: 100, 
    nullable: false, 
    unique: true 
  })
  email: string;

  @Column({ 
    name: 'full_name', 
    type: 'varchar', 
    length: 100, 
    nullable: true 
  })
  fullName?: string;

  @Column({ 
    name: 'password_hash', 
    type: 'varchar', 
    length: 255, 
    nullable: false 
  })
  passwordHash: string;

  @Column({ 
    name: 'role', 
    type: 'enum', 
    enum: UserRole, 
    nullable: false 
  })
  role: UserRole;

  @Column({ 
    name: 'is_active', 
    type: 'boolean', 
    default: true 
  })
  isActive: boolean;

  @Column({ 
    name: 'last_login_at', 
    type: 'datetime', 
    nullable: true 
  })
  lastLoginAt?: Date;

  @Column({ 
    name: 'department_id', 
    type: 'int', 
    nullable: true 
  })
  departmentId?: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => Department, { nullable: true })
  @JoinColumn({ name: 'department_id' })
  department?: Department;

  @OneToMany(() => IdleResource, (resource) => resource.createdByUser)
  createdResources: IdleResource[];

  @OneToMany(() => IdleResource, (resource) => resource.updatedByUser)
  updatedResources: IdleResource[];

  @OneToMany(() => CVFile, (cv) => cv.uploadedByUser)
  uploadedCVs: CVFile[];

  @OneToMany(() => UpdateHistory, (history) => history.updatedByUser)
  updateHistories: UpdateHistory[];
}
