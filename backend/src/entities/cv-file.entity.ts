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

export enum FileType {
  PDF = 'PDF',
  DOC = 'DOC',
  DOCX = 'DOCX',
  XLS = 'XLS',
  XLSX = 'XLSX',
}

@Entity('cv_files')
@Index('idx_resource_id', ['resourceId'])
@Index('idx_uploaded_by', ['uploadedBy'])
export class CVFile {
  @PrimaryGeneratedColumn({ name: 'cv_id' })
  cvId: number;

  @Column({ 
    name: 'resource_id', 
    type: 'int', 
    nullable: false 
  })
  resourceId: number;

  @Column({ 
    name: 'file_name', 
    type: 'varchar', 
    length: 255, 
    nullable: false 
  })
  fileName: string;

  @Column({ 
    name: 'file_path', 
    type: 'varchar', 
    length: 500, 
    nullable: false 
  })
  filePath: string;

  @Column({ 
    name: 'file_type', 
    type: 'enum', 
    enum: FileType, 
    nullable: false 
  })
  fileType: FileType;

  @Column({ 
    name: 'file_size', 
    type: 'bigint', 
    nullable: false 
  })
  fileSize: number;

  @Column({ 
    name: 'uploaded_by', 
    type: 'int', 
    nullable: false 
  })
  uploadedBy: number;

  @CreateDateColumn({ name: 'uploaded_at' })
  uploadedAt: Date;

  // Relations
  @ManyToOne(() => IdleResource, (resource) => resource.cvFiles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'resource_id' })
  resource: IdleResource;

  @ManyToOne(() => User, (user) => user.uploadedCVs)
  @JoinColumn({ name: 'uploaded_by' })
  uploadedByUser: User;
}
