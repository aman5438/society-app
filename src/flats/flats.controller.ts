import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { FlatsService } from './flats.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateFlatDto } from './dto/create-flat.dto';

@ApiTags('Flats')
@ApiBearerAuth()
@Controller('flats')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FlatsController {
  constructor(private readonly flatsService: FlatsService) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Create a new flat (Admin only)' })
  @ApiResponse({ status: 201, description: 'Flat created successfully' })
  create(@Body() createFlatDto: CreateFlatDto) {
    return this.flatsService.create(createFlatDto);
  }

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: 'Get all flats (Admin only)' })
  @ApiResponse({ status: 200, description: 'List of flats returned' })
  findAll() {
    return this.flatsService.findAll();
  }
}
