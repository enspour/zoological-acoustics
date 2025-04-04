import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { CreatableProjectDataField, ProjectDataFieldType } from '@kudu/domain';

export class CreateProjectDataFieldDto implements CreatableProjectDataField {
  @ApiProperty({ description: 'Name', nullable: false })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ description: 'Type', nullable: false })
  @IsEnum(ProjectDataFieldType)
  type!: ProjectDataFieldType;
}
