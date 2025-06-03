import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { UpdatableUser } from '@kraken/domain';

export class UpdateUserDto implements Omit<UpdatableUser, 'uuid'> {
  @ApiProperty({ description: 'Name', nullable: false })
  @IsString()
  @IsNotEmpty()
  name!: string;
}
