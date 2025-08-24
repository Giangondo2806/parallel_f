import { AppDataSource } from '../data-source';
import { IdleResource, ResourceStatus } from '../../entities/idle-resource.entity';
import { Department } from '../../entities/department.entity';
import { User } from '../../entities/user.entity';

export async function seedIdleResources(departments: Department[], users: User[]): Promise<IdleResource[]> {
  const resourceRepository = AppDataSource.getRepository(IdleResource);

  // Get admin and RA users for created_by/updated_by
  const adminUser = users.find(u => u.username === 'admin');
  const raUser = users.find(u => u.username === 'ra.nguyen');
  
  if (!adminUser || !raUser) {
    throw new Error('Admin or RA user not found for seeding resources');
  }

  // Helper function to get date relative to today
  const daysAgo = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
  };

  const resourcesData = [
    // IT Department Resources
    {
      employeeCode: 'IT001',
      fullName: 'Nguyen Van Duc',
      email: 'duc.nguyen@company.com',
      phone: '+84901234567',
      jobTitle: 'Senior Java Developer',
      skillSet: 'Java, Spring Boot, Microservices, Docker, Kubernetes',
      departmentId: departments.find(d => d.departmentCode === 'IT')!.departmentId,
      idleFrom: daysAgo(90), // 3 months ago - URGENT
      status: ResourceStatus.AVAILABLE,
      processNote: 'Previous project completed. Ready for new assignment.',
      rate: '2000 USD',
      isUrgent: true,
      createdBy: adminUser.userId,
      updatedBy: raUser.userId,
    },
    {
      employeeCode: 'IT002',
      fullName: 'Tran Thi Mai',
      email: 'mai.tran@company.com',
      phone: '+84901234568',
      jobTitle: 'Frontend Developer',
      skillSet: 'React, TypeScript, Next.js, Material-UI, CSS',
      departmentId: departments.find(d => d.departmentCode === 'IT')!.departmentId,
      idleFrom: daysAgo(45), // 1.5 months ago
      status: ResourceStatus.AVAILABLE,
      processNote: 'Completed UI redesign project. Looking for new frontend challenges.',
      rate: '1500 USD',
      isUrgent: false,
      createdBy: raUser.userId,
      updatedBy: raUser.userId,
    },
    {
      employeeCode: 'IT003',
      fullName: 'Le Van Minh',
      email: 'minh.le@company.com',
      phone: '+84901234569',
      jobTitle: 'DevOps Engineer',
      skillSet: 'AWS, Docker, Kubernetes, Jenkins, Terraform',
      departmentId: departments.find(d => d.departmentCode === 'IT')!.departmentId,
      idleFrom: daysAgo(75), // 2.5 months ago - URGENT
      status: ResourceStatus.AVAILABLE,
      processNote: 'Infrastructure migration project finished. Available for cloud projects.',
      rate: '2200 USD',
      isUrgent: true,
      createdBy: adminUser.userId,
      updatedBy: adminUser.userId,
    },
    {
      employeeCode: 'IT004',
      fullName: 'Pham Thi Linh',
      email: 'linh.pham@company.com',
      phone: '+84901234570',
      jobTitle: 'Backend Developer',
      skillSet: 'Node.js, NestJS, PostgreSQL, MongoDB, Redis',
      departmentId: departments.find(d => d.departmentCode === 'IT')!.departmentId,
      idleFrom: daysAgo(30), // 1 month ago
      status: ResourceStatus.TRAINING,
      processNote: 'Currently taking advanced Node.js certification course.',
      rate: '1800 USD',
      isUrgent: false,
      createdBy: raUser.userId,
      updatedBy: raUser.userId,
    },

    // QA Department Resources
    {
      employeeCode: 'QA001',
      fullName: 'Hoang Van Tuan',
      email: 'tuan.hoang@company.com',
      phone: '+84901234571',
      jobTitle: 'Senior QA Engineer',
      skillSet: 'Selenium, TestNG, API Testing, Performance Testing',
      departmentId: departments.find(d => d.departmentCode === 'QA')!.departmentId,
      idleFrom: daysAgo(100), // Over 3 months - URGENT
      status: ResourceStatus.AVAILABLE,
      processNote: 'Long-term testing project completed. Expert in automation testing.',
      rate: '1700 USD',
      isUrgent: true,
      createdBy: adminUser.userId,
      updatedBy: raUser.userId,
    },
    {
      employeeCode: 'QA002',
      fullName: 'Vu Thi Huong',
      email: 'huong.vu@company.com',
      phone: '+84901234572',
      jobTitle: 'Manual Tester',
      skillSet: 'Manual Testing, Test Case Design, Bug Tracking',
      departmentId: departments.find(d => d.departmentCode === 'QA')!.departmentId,
      idleFrom: daysAgo(20), // 3 weeks ago
      status: ResourceStatus.AVAILABLE,
      processNote: 'Mobile app testing project finished. Available immediately.',
      rate: '1200 USD',
      isUrgent: false,
      createdBy: raUser.userId,
      updatedBy: raUser.userId,
    },

    // Marketing Department Resources
    {
      employeeCode: 'MKT001',
      fullName: 'Dao Van Hung',
      email: 'hung.dao@company.com',
      phone: '+84901234573',
      jobTitle: 'Digital Marketing Specialist',
      skillSet: 'Google Ads, Facebook Ads, SEO, Content Marketing',
      departmentId: departments.find(d => d.departmentCode === 'MKT')!.departmentId,
      idleFrom: daysAgo(50), // 1.7 months ago
      status: ResourceStatus.AVAILABLE,
      processNote: 'Marketing campaign completed successfully. Ready for new campaigns.',
      rate: '1400 USD',
      isUrgent: false,
      createdBy: raUser.userId,
      updatedBy: raUser.userId,
    },
    {
      employeeCode: 'MKT002',
      fullName: 'Bui Thi Lan',
      email: 'lan.bui@company.com',
      phone: '+84901234574',
      jobTitle: 'Content Creator',
      skillSet: 'Content Writing, Social Media, Graphic Design, Video Editing',
      departmentId: departments.find(d => d.departmentCode === 'MKT')!.departmentId,
      idleFrom: daysAgo(80), // 2.7 months ago - URGENT
      status: ResourceStatus.AVAILABLE,
      processNote: 'Content strategy project completed. Strong social media presence skills.',
      rate: '1300 USD',
      isUrgent: true,
      createdBy: adminUser.userId,
      updatedBy: raUser.userId,
    },

    // Finance Department Resources
    {
      employeeCode: 'FIN001',
      fullName: 'Ngo Van Duc',
      email: 'duc.ngo@company.com',
      phone: '+84901234575',
      jobTitle: 'Financial Analyst',
      skillSet: 'Financial Analysis, Excel, SAP, Budget Planning',
      departmentId: departments.find(d => d.departmentCode === 'FIN')!.departmentId,
      idleFrom: daysAgo(35), // 1.2 months ago
      status: ResourceStatus.AVAILABLE,
      processNote: 'Annual budget planning completed. Available for financial projects.',
      rate: '1600 USD',
      isUrgent: false,
      createdBy: raUser.userId,
      updatedBy: raUser.userId,
    },

    // Operations Department Resources
    {
      employeeCode: 'OPS001',
      fullName: 'Truong Thi Mai',
      email: 'mai.truong@company.com',
      phone: '+84901234576',
      jobTitle: 'Process Improvement Specialist',
      skillSet: 'Process Analysis, Lean Six Sigma, Data Analysis',
      departmentId: departments.find(d => d.departmentCode === 'OPS')!.departmentId,
      idleFrom: daysAgo(65), // 2.2 months ago - URGENT
      status: ResourceStatus.AVAILABLE,
      processNote: 'Process optimization project completed. Certified Lean Six Sigma Black Belt.',
      rate: '1900 USD',
      isUrgent: true,
      createdBy: adminUser.userId,
      updatedBy: adminUser.userId,
    },

    // R&D Department Resources
    {
      employeeCode: 'RND001',
      fullName: 'Phan Van Long',
      email: 'long.phan@company.com',
      phone: '+84901234577',
      jobTitle: 'Research Scientist',
      skillSet: 'Machine Learning, Python, TensorFlow, Data Science',
      departmentId: departments.find(d => d.departmentCode === 'RND')!.departmentId,
      idleFrom: daysAgo(25), // 3.5 weeks ago
      status: ResourceStatus.AVAILABLE,
      processNote: 'AI research project phase completed. PhD in Computer Science.',
      rate: '2500 USD',
      isUrgent: false,
      createdBy: raUser.userId,
      updatedBy: raUser.userId,
    },

    // Additional test scenarios
    {
      employeeCode: 'IT005',
      fullName: 'Nguyen Thi Thao',
      email: 'thao.nguyen@company.com',
      phone: '+84901234578',
      jobTitle: 'Junior Developer',
      skillSet: 'JavaScript, HTML, CSS, Basic React',
      departmentId: departments.find(d => d.departmentCode === 'IT')!.departmentId,
      idleFrom: daysAgo(15), // 2 weeks ago
      status: ResourceStatus.ON_LEAVE,
      processNote: 'On maternity leave. Expected return next month.',
      rate: '1000 USD',
      isUrgent: false,
      createdBy: raUser.userId,
      updatedBy: raUser.userId,
    },
    {
      employeeCode: 'IT006',
      fullName: 'Le Van Hieu',
      email: 'hieu.le@company.com',
      phone: '+84901234579',
      jobTitle: 'Full Stack Developer',
      skillSet: 'MEAN Stack, Angular, Node.js, MongoDB',
      departmentId: departments.find(d => d.departmentCode === 'IT')!.departmentId,
      idleFrom: daysAgo(120), // 4 months ago - VERY URGENT
      status: ResourceStatus.ASSIGNED,
      processNote: 'Recently assigned to new project after long idle period.',
      rate: '1800 USD',
      isUrgent: true,
      createdBy: adminUser.userId,
      updatedBy: raUser.userId,
    },
  ];

  const resources = resourceRepository.create(resourcesData);
  return await resourceRepository.save(resources);
}
