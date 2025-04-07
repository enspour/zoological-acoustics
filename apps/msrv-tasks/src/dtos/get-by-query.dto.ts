import { Transform } from 'class-transformer';
import { IsArray, IsDateString, IsUUID, ValidateIf } from 'class-validator';

export class GetByQueryDto {
  @IsDateString()
  @ValidateIf((_, value) => value !== undefined)
  startDate!: string;

  @IsDateString()
  @ValidateIf((_, value) => value !== undefined)
  endDate!: string;

  @IsArray()
  @IsUUID(4, { each: true })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',');
    }

    return value;
  })
  @ValidateIf((_, value) => value !== undefined)
  boardUuids!: string[];

  @IsArray()
  @IsUUID(4, { each: true })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',');
    }

    return value;
  })
  @ValidateIf((_, value) => value !== undefined)
  projectUuids!: string[];
}
