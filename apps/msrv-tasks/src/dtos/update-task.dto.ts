import { ApiProperty } from '@nestjs/swagger';
import { UpdatableTask } from '@octo/domain';
import { IsDateString, IsString, IsUUID, ValidateIf } from 'class-validator';

export class UpdateTaskDto implements Omit<UpdatableTask, 'uuid'> {
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

  @ApiProperty({ description: 'Column uuid', nullable: false })
  @IsUUID()
  @ValidateIf((_, value) => value !== null)
  columnUuid!: string | null;

  @ApiProperty({ description: 'Executor uuids', nullable: false })
  @IsUUID('4', { each: true })
  executorUuids!: string[];
}
