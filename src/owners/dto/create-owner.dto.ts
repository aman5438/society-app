// src/owners/dto/create-owner.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOwnerDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @Type(() => Number) 
  flatId: number;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ example: '9876543210' })
  @IsString()
  contact: string;

  @ApiProperty({ example: 'john@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  password: string;
}
