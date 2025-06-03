import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { CreatableProjectDataValue } from '@kraken/domain';

export class CreateProjectDataValueDto
  implements Omit<CreatableProjectDataValue, 'fieldUuid'>
{
  @ApiProperty({ description: 'Value', nullable: false })
  @IsString()
  @IsNotEmpty()
  value!: string;
}
