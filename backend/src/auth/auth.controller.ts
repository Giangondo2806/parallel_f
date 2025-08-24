import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { LoginDto } from './dto/login.dto';
import {
  AuthResponse,
  UserContext,
} from './interfaces/auth-response.interface';
import { User } from '../entities/user.entity';
import { RequirePermissions } from './decorators/permissions.decorator';
import { Permission } from './permissions/permission.system';

interface AuthenticatedRequest extends ExpressRequest {
  user?: User;
  userContext?: UserContext;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Request() req: AuthenticatedRequest,
  ): Promise<{ message: string }> {
    if (!req.user?.userId) {
      throw new Error('User not authenticated');
    }
    return this.authService.logout(req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('profile')
  getProfile(@Request() req: AuthenticatedRequest): User {
    if (!req.user) {
      throw new Error('User not authenticated');
    }
    return req.user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @Request() req: AuthenticatedRequest,
  ): Promise<AuthResponse> {
    if (!req.user) {
      throw new Error('User not authenticated');
    }
    return this.authService.refreshToken(req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @RequirePermissions(Permission.READ_USER)
  @Get('permissions')
  async getPermissions(
    @Request() req: AuthenticatedRequest,
  ): Promise<{ permissions: string[] }> {
    if (!req.user) {
      throw new Error('User not authenticated');
    }
    const permissions = await this.authService.getUserPermissions(req.user);
    return { permissions };
  }

  @Get('health')
  @HttpCode(HttpStatus.OK)
  healthCheck(): { status: string; timestamp: string } {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
    };
  }
}
