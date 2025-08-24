import { Module } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { ResponseTransformInterceptor } from './interceptors/response-transform.interceptor';
import { SecurityHeadersMiddleware } from './middleware/security-headers.middleware';
import {
  ParsePositiveIntPipe,
  ParseOptionalIntPipe,
  TrimStringsPipe,
} from './pipes/validation.pipes';

@Module({
  providers: [
    HttpExceptionFilter,
    LoggingInterceptor,
    ResponseTransformInterceptor,
    SecurityHeadersMiddleware,
    ParsePositiveIntPipe,
    ParseOptionalIntPipe,
    TrimStringsPipe,
  ],
  exports: [
    HttpExceptionFilter,
    LoggingInterceptor,
    ResponseTransformInterceptor,
    SecurityHeadersMiddleware,
    ParsePositiveIntPipe,
    ParseOptionalIntPipe,
    TrimStringsPipe,
  ],
})
export class CommonModule {}
