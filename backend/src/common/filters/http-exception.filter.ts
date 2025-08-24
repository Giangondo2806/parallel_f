import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

export interface ErrorResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  message: string | string[];
  error?: string;
  stack?: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let message: string | string[];
    let error: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
        error = HttpStatus[status];
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const responseObj = exceptionResponse as { message?: string | string[]; error?: string };
        message = responseObj.message || exception.message;
        error = responseObj.error || HttpStatus[status];
      } else {
        message = exception.message;
        error = HttpStatus[status];
      }
    } else {
      // Handle unexpected errors
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
      error = 'Internal Server Error';
      
      // Log the full error for debugging
      const errorMessage = exception instanceof Error ? exception.message : 'Unknown error';
      const errorStack = exception instanceof Error ? exception.stack : undefined;
      this.logger.error(
        `Unexpected error: ${errorMessage}`,
        errorStack,
        'HttpExceptionFilter',
      );
    }

    const errorResponse: ErrorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
      error,
    };

    // Include stack trace in development
    if (process.env.NODE_ENV === 'development' && exception instanceof Error && exception.stack) {
      errorResponse.stack = exception.stack;
    }

    // Log the error
    const messageStr = Array.isArray(message) ? message.join(', ') : message;
    const errorStack = exception instanceof Error ? exception.stack : undefined;
    this.logger.error(
      `${request.method} ${request.url} - ${status} - ${messageStr}`,
      errorStack,
      'HttpExceptionFilter',
    );

    response.status(status).json(errorResponse);
  }
}
