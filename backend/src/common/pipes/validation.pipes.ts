import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParsePositiveIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    
    if (isNaN(val) || val <= 0) {
      throw new BadRequestException(
        `${metadata.data} must be a positive integer`,
      );
    }
    
    return val;
  }
}

@Injectable()
export class ParseOptionalIntPipe
  implements PipeTransform<string | undefined, number | undefined>
{
  transform(
    value: string | undefined,
    metadata: ArgumentMetadata,
  ): number | undefined {
    if (value === undefined || value === null || value === '') {
      return undefined;
    }
    
    const val = parseInt(value, 10);
    
    if (isNaN(val)) {
      throw new BadRequestException(`${metadata.data} must be a valid integer`);
    }
    
    return val;
  }
}

@Injectable()
export class TrimStringsPipe implements PipeTransform {
  transform(value: unknown): unknown {
    if (typeof value === 'string') {
      return value.trim();
    }
    
    if (typeof value === 'object' && value !== null) {
      const trimmed: Record<string, unknown> = {};
      const obj = value as Record<string, unknown>;
      
      for (const key in obj) {
        if (typeof obj[key] === 'string') {
          trimmed[key] = (obj[key] as string).trim();
        } else {
          trimmed[key] = obj[key];
        }
      }
      return trimmed;
    }
    
    return value;
  }
}
