import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'Username', nullable: false })
  @IsString()
  @IsNotEmpty()
  username!: string;

  @ApiProperty({ description: 'Password', nullable: false })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
