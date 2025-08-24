import { AppDataSource } from '../data-source';
import { Department } from '../../entities/department.entity';

export async function seedDepartments(): Promise<Department[]> {
  const departmentRepository = AppDataSource.getRepository(Department);

  const departmentsData = [
    {
      departmentName: 'Information Technology',
      departmentCode: 'IT',
      description: 'Responsible for software development, system administration, and IT infrastructure',
      isActive: true,
    },
    {
      departmentName: 'Human Resources',
      departmentCode: 'HR',
      description: 'Manages recruitment, employee relations, and organizational development',
      isActive: true,
    },
    {
      departmentName: 'Finance and Accounting',
      departmentCode: 'FIN',
      description: 'Handles financial planning, accounting, and budget management',
      isActive: true,
    },
    {
      departmentName: 'Marketing and Sales',
      departmentCode: 'MKT',
      description: 'Responsible for product marketing, sales, and customer relations',
      isActive: true,
    },
    {
      departmentName: 'Operations',
      departmentCode: 'OPS',
      description: 'Manages daily operations, logistics, and process optimization',
      isActive: true,
    },
    {
      departmentName: 'Research and Development',
      departmentCode: 'RND',
      description: 'Innovation, product development, and research activities',
      isActive: true,
    },
    {
      departmentName: 'Quality Assurance',
      departmentCode: 'QA',
      description: 'Quality control, testing, and compliance management',
      isActive: true,
    },
    {
      departmentName: 'Customer Support',
      departmentCode: 'CS',
      description: 'Customer service, technical support, and client relations',
      isActive: true,
    },
    {
      departmentName: 'Business Analysis',
      departmentCode: 'BA',
      description: 'Business process analysis, requirements gathering, and strategy',
      isActive: true,
    },
    {
      departmentName: 'Project Management Office',
      departmentCode: 'PMO',
      description: 'Project coordination, portfolio management, and methodology standardization',
      isActive: true,
    },
  ];

  const departments = departmentRepository.create(departmentsData);
  return await departmentRepository.save(departments);
}
