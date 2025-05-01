import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString, IsUUID, ValidateIf } from 'class-validator';

import { CreatableTask } from '@octo/domain';

export class CreateTaskDto implements CreatableTask {
  @ApiProperty({ description: 'Title', nullable: false })
  @IsString()
  title!: string;

  @ApiProperty({ description: 'Start date', nullable: false })
  @IsDateString()
  startDate!: string;

  @ApiProperty({ description: 'End date', nullable: false })
  @IsDateString()
  endDate!: string;

  @ApiProperty({ description: 'Board uuid', nullable: false })
  @IsUUID()
  boardUuid!: string;

  @ApiProperty({ description: 'Column uuid', nullable: true })
  @IsUUID()
  @ValidateIf((_, value) => value !== null)
  columnUuid!: string | null;

  @ApiProperty({ description: 'Executor uuids', nullable: false })
  @IsUUID('4', { each: true })
  executorUuids!: string[];
}
