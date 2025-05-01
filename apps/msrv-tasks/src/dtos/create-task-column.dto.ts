import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { CreatableTaskColumn } from '@octo/domain';

export class CreateTaskColumnDto implements CreatableTaskColumn {
  @ApiProperty({ description: 'Title', nullable: false })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ description: 'Color', nullable: false })
  @IsString()
  @IsNotEmpty()
  color!: string;

  @ApiProperty({ description: 'Board uuid', nullable: false })
  @IsUUID()
  boardUuid!: string;
}
