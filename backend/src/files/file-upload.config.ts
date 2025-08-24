import { extname } from 'path';
import { Request } from 'express';
import { BadRequestException } from '@nestjs/common';

// Allowed file types for CV uploads
export const ALLOWED_FILE_TYPES = [
  'application/pdf', // PDF
  'application/msword', // DOC
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
  'application/vnd.ms-excel', // XLS
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLSX
];

// Allowed file extensions
export const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx', '.xls', '.xlsx'];

// Maximum file size (10MB)
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

// File upload configuration
export const multerConfig = {
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    // Check file type
    if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
      const error = new BadRequestException(
        'Invalid file type. Only PDF, DOC, DOCX, XLS, XLSX files are allowed.',
      );
      return callback(error, false);
    }

    // Check file extension
    const fileExtension = extname(file.originalname).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
      const error = new BadRequestException(
        `Invalid file extension. Only ${ALLOWED_EXTENSIONS.join(', ')} files are allowed.`,
      );
      return callback(error, false);
    }

    callback(null, true);
  },
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
};

// Generate unique filename
export const generateUniqueFilename = (originalname: string): string => {
  const timestamp = Date.now();
  const randomSuffix = Math.round(Math.random() * 1e9);
  const extension = extname(originalname);
  const nameWithoutExt = originalname.replace(extension, '');
  
  // Sanitize filename
  const sanitizedName = nameWithoutExt
    .replace(/[^a-zA-Z0-9]/g, '_')
    .substring(0, 50);
    
  return `${sanitizedName}_${timestamp}_${randomSuffix}${extension}`;
};

// Validate file size
export const validateFileSize = (file: Express.Multer.File): void => {
  if (file.size > MAX_FILE_SIZE) {
    throw new BadRequestException(
      `File size too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.`,
    );
  }
};

// Get file type from extension
export const getFileTypeFromExtension = (filename: string): string => {
  const extension = extname(filename).toLowerCase();
  
  switch (extension) {
    case '.pdf':
      return 'application/pdf';
    case '.doc':
      return 'application/msword';
    case '.docx':
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    case '.xls':
      return 'application/vnd.ms-excel';
    case '.xlsx':
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    default:
      return 'application/octet-stream';
  }
};
