import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { AuthResponse } from './interfaces/auth-response.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { username, isActive: true },
      relations: ['department'],
    });

    if (user && await bcrypt.compare(password, user.passwordHash)) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Update last login time
    await this.userRepository.update(user.userId, {
      lastLoginAt: new Date(),
    });

    const payload = {
      username: user.username,
      sub: user.userId,
      role: user.role,
      departmentId: user.departmentId ?? null,
    };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        userId: user.userId,
        username: user.username,
        email: user.email,
        fullName: user.fullName ?? null,
        role: user.role,
        departmentId: user.departmentId ?? null,
        departmentName: user.department?.departmentName,
        isActive: user.isActive,
        lastLoginAt: new Date(),
      },
      expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    };
  }

  async logout(userId: number): Promise<{ message: string }> {
    // In a production app, you might want to blacklist the token
    // For now, we'll just return a success message
    // You could also log the logout activity here
    
    return { message: 'Logout successful' };
  }

  async validateToken(payload: any): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { userId: payload.sub, isActive: true },
      relations: ['department'],
    });

    if (!user) {
      throw new UnauthorizedException('User not found or inactive');
    }

    return user;
  }

  async refreshToken(user: User): Promise<AuthResponse> {
    const payload = {
      username: user.username,
      sub: user.userId,
      role: user.role,
      departmentId: user.departmentId ?? null,
    };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        userId: user.userId,
        username: user.username,
        email: user.email,
        fullName: user.fullName ?? null,
        role: user.role,
        departmentId: user.departmentId ?? null,
        departmentName: user.department?.departmentName,
        isActive: user.isActive,
        lastLoginAt: user.lastLoginAt,
      },
      expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    };
  }

  async getUserPermissions(user: User): Promise<string[]> {
    // Define permissions based on roles
    const permissions: Record<UserRole, string[]> = {
      [UserRole.ADMIN]: [
        'users:read',
        'users:write',
        'users:delete',
        'departments:read',
        'departments:write',
        'departments:delete',
        'resources:read',
        'resources:write',
        'resources:delete',
        'resources:export',
        'resources:import',
        'history:read',
        'reports:read',
        'reports:export',
        'cv:read',
        'cv:upload',
        'cv:delete',
      ],
      [UserRole.RA]: [
        'users:read',
        'departments:read',
        'resources:read',
        'resources:write',
        'resources:delete',
        'resources:export',
        'resources:import',
        'history:read',
        'reports:read',
        'reports:export',
        'cv:read',
        'cv:upload',
        'cv:delete',
      ],
      [UserRole.MANAGER]: [
        'departments:read',
        'resources:read',
        'resources:write',
        'history:read',
        'reports:read',
        'reports:export',
        'cv:read',
        'cv:upload',
      ],
      [UserRole.VIEWER]: [
        'departments:read',
        'resources:read',
        'history:read',
        'reports:read',
        'cv:read',
      ],
    };

    return permissions[user.role] || [];
  }
}
