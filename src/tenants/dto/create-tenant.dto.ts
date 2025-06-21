import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateTenantDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  flatId: number;

  @ApiProperty({ example: 'Alice' })
  @IsString()
  name: string;

  @ApiProperty({ example: '9999988888' })
  @IsString()
  contact: string;

  @ApiProperty({ example: '2025-06-01' })
  @IsDateString()
  leaseStartDate: string;

  @ApiProperty({ example: '2026-06-01' })
  @IsOptional()
  @IsDateString()
  leaseEndDate?: string;
}