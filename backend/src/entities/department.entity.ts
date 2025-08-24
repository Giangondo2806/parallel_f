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

@Entity('departments')
@Index('idx_department_code', ['departmentCode'], { unique: true })
export class Department {
  @PrimaryGeneratedColumn({ name: 'department_id' })
  departmentId: number;

  @Column({ 
    name: 'department_name', 
    type: 'varchar', 
    length: 100, 
    nullable: false 
  })
  departmentName: string;

  @Column({ 
    name: 'department_code', 
    type: 'varchar', 
    length: 20, 
    nullable: false, 
    unique: true 
  })
  departmentCode: string;

  @Column({ 
    name: 'description', 
    type: 'varchar', 
    length: 500, 
    nullable: true 
  })
  description?: string;

  @Column({ 
    name: 'is_active', 
    type: 'boolean', 
    default: true 
  })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @OneToMany(() => IdleResource, (resource) => resource.department)
  idleResources: IdleResource[];
}
