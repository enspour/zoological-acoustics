import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { CreatableTaskBoard } from '@kraken/domain';

export class CreateTaskBoardDto implements CreatableTaskBoard {
  @ApiProperty({ description: 'Title', nullable: false })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ description: 'Project uuid', nullable: false })
  @IsUUID()
  projectUuid!: string;
}
