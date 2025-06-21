import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class SignupDto {
  @ApiProperty({ example: 'admin@society.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  password: string;

  @ApiProperty({ enum: ['admin', 'owner'] })
  @IsEnum(['admin', 'owner'])
  role: 'admin' | 'owner';
}