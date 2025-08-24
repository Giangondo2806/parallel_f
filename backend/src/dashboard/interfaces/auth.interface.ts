export interface AuthenticatedUser {
  userId: number;
  username: string;
  email: string;
  role: string;
  departmentId?: number;
}

export interface AuthenticatedRequest {
  user: AuthenticatedUser;
}
