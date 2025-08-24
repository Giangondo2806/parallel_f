import { AppDataSource } from '../data-source';
import { CVFile, FileType } from '../../entities/cv-file.entity';
import { IdleResource } from '../../entities/idle-resource.entity';
import { User } from '../../entities/user.entity';

export async function seedCVFiles(resources: IdleResource[], users: User[]): Promise<CVFile[]> {
  const cvRepository = AppDataSource.getRepository(CVFile);

  // Get admin and RA users for uploaded_by
  const adminUser = users.find(u => u.username === 'admin');
  const raUser = users.find(u => u.username === 'ra.nguyen');
  
  if (!adminUser || !raUser) {
    throw new Error('Admin or RA user not found for seeding CV files');
  }

  // Helper function to get date relative to today
  const daysAgo = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
  };

  const cvFilesData = [
    // CV files for IT resources
    {
      resourceId: resources.find(r => r.employeeCode === 'IT001')!.resourceId,
      fileName: 'Nguyen_Van_Duc_CV.pdf',
      filePath: '/uploads/cvs/2024/nguyen_van_duc_cv.pdf',
      fileType: FileType.PDF,
      fileSize: 524288, // 512KB
      uploadedBy: adminUser.userId,
    },
    {
      resourceId: resources.find(r => r.employeeCode === 'IT002')!.resourceId,
      fileName: 'Tran_Thi_Mai_Resume.docx',
      filePath: '/uploads/cvs/2024/tran_thi_mai_resume.docx',
      fileType: FileType.DOCX,
      fileSize: 356789, // ~348KB
      uploadedBy: raUser.userId,
    },
    {
      resourceId: resources.find(r => r.employeeCode === 'IT003')!.resourceId,
      fileName: 'Le_Van_Minh_CV_2024.pdf',
      filePath: '/uploads/cvs/2024/le_van_minh_cv_2024.pdf',
      fileType: FileType.PDF,
      fileSize: 789456, // ~771KB
      uploadedBy: adminUser.userId,
    },
    {
      resourceId: resources.find(r => r.employeeCode === 'IT004')!.resourceId,
      fileName: 'Pham_Thi_Linh_Portfolio.pdf',
      filePath: '/uploads/cvs/2024/pham_thi_linh_portfolio.pdf',
      fileType: FileType.PDF,
      fileSize: 1048576, // 1MB
      uploadedBy: raUser.userId,
    },

    // CV files for QA resources
    {
      resourceId: resources.find(r => r.employeeCode === 'QA001')!.resourceId,
      fileName: 'Hoang_Van_Tuan_QA_Resume.doc',
      filePath: '/uploads/cvs/2024/hoang_van_tuan_qa_resume.doc',
      fileType: FileType.DOC,
      fileSize: 445566, // ~435KB
      uploadedBy: adminUser.userId,
    },
    {
      resourceId: resources.find(r => r.employeeCode === 'QA002')!.resourceId,
      fileName: 'Vu_Thi_Huong_CV.pdf',
      filePath: '/uploads/cvs/2024/vu_thi_huong_cv.pdf',
      fileType: FileType.PDF,
      fileSize: 667788, // ~652KB
      uploadedBy: raUser.userId,
    },

    // CV files for Marketing resources
    {
      resourceId: resources.find(r => r.employeeCode === 'MKT001')!.resourceId,
      fileName: 'Dao_Van_Hung_Marketing_CV.pdf',
      filePath: '/uploads/cvs/2024/dao_van_hung_marketing_cv.pdf',
      fileType: FileType.PDF,
      fileSize: 998877, // ~975KB
      uploadedBy: raUser.userId,
    },
    {
      resourceId: resources.find(r => r.employeeCode === 'MKT002')!.resourceId,
      fileName: 'Bui_Thi_Lan_Creative_Portfolio.pdf',
      filePath: '/uploads/cvs/2024/bui_thi_lan_creative_portfolio.pdf',
      fileType: FileType.PDF,
      fileSize: 2097152, // 2MB - larger portfolio with images
      uploadedBy: adminUser.userId,
    },

    // CV files for Finance resources
    {
      resourceId: resources.find(r => r.employeeCode === 'FIN001')!.resourceId,
      fileName: 'Ngo_Van_Duc_Finance_Resume.docx',
      filePath: '/uploads/cvs/2024/ngo_van_duc_finance_resume.docx',
      fileType: FileType.DOCX,
      fileSize: 334455, // ~327KB
      uploadedBy: raUser.userId,
    },

    // CV files for Operations resources
    {
      resourceId: resources.find(r => r.employeeCode === 'OPS001')!.resourceId,
      fileName: 'Truong_Thi_Mai_Process_CV.pdf',
      filePath: '/uploads/cvs/2024/truong_thi_mai_process_cv.pdf',
      fileType: FileType.PDF,
      fileSize: 556677, // ~544KB
      uploadedBy: adminUser.userId,
    },

    // CV files for R&D resources
    {
      resourceId: resources.find(r => r.employeeCode === 'RND001')!.resourceId,
      fileName: 'Phan_Van_Long_Research_CV.pdf',
      filePath: '/uploads/cvs/2024/phan_van_long_research_cv.pdf',
      fileType: FileType.PDF,
      fileSize: 1556677, // ~1.5MB - research CV with publications
      uploadedBy: raUser.userId,
    },

    // CV files for additional test resources
    {
      resourceId: resources.find(r => r.employeeCode === 'IT005')!.resourceId,
      fileName: 'Nguyen_Thi_Thao_Junior_CV.pdf',
      filePath: '/uploads/cvs/2024/nguyen_thi_thao_junior_cv.pdf',
      fileType: FileType.PDF,
      fileSize: 223344, // ~218KB - shorter junior CV
      uploadedBy: raUser.userId,
    },
    {
      resourceId: resources.find(r => r.employeeCode === 'IT006')!.resourceId,
      fileName: 'Le_Van_Hieu_FullStack_Resume.docx',
      filePath: '/uploads/cvs/2024/le_van_hieu_fullstack_resume.docx',
      fileType: FileType.DOCX,
      fileSize: 445566, // ~435KB
      uploadedBy: adminUser.userId,
    },

    // Some resources without CVs to test different scenarios
    // Note: Not all resources need CV files for realistic testing
  ];

  // Set upload dates to be within reasonable timeframes
  const cvFiles = cvRepository.create(cvFilesData.map((cv, index) => ({
    ...cv,
    uploadedAt: daysAgo(Math.floor(Math.random() * 30) + 1), // Random date within last 30 days
  })));

  return await cvRepository.save(cvFiles);
}
