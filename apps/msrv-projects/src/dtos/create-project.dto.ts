import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { CreatableProject } from '@kraken/domain';

export class CreateProjectDto implements CreatableProject {
  @ApiProperty({ description: 'Name', nullable: false })
  @IsString()
  @IsNotEmpty()
  name!: string;
}
