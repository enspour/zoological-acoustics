import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { UpdatableProjectDataField } from '@octo/domain';

export class UpdateProjectDataFieldDto
  implements Omit<UpdatableProjectDataField, 'uuid'>
{
  @ApiProperty({ description: 'Name', nullable: false })
  @IsString()
  @IsNotEmpty()
  name!: string;
}
