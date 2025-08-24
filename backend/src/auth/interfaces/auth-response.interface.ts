import { UserRole } from '../../entities/user.entity';

export interface AuthResponse {
  access_token: string;
  user: {
    userId: number;
    username: string;
    email: string;
    fullName: string | null;
    role: UserRole;
    departmentId: number | null;
    departmentName?: string;
    isActive: boolean;
    lastLoginAt?: Date;
  };
  expiresIn: string;
}

export interface UserContext {
  userId: number;
  username: string;
  email: string;
  fullName: string | null;
  role: UserRole;
  departmentId: number | null;
  departmentName?: string;
  isActive: boolean;
  lastLoginAt?: Date;
}

export interface JwtPayload {
  username: string;
  sub: number;
  role: UserRole;
  departmentId: number | null;
  iat?: number;
  exp?: number;
}
