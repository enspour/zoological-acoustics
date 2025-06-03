import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { UpdatableProject } from '@kraken/domain';

export class UpdateProjectDto implements Omit<UpdatableProject, 'uuid'> {
  @ApiProperty({ description: 'Name', nullable: false })
  @IsString()
  @IsNotEmpty()
  name!: string;
}
