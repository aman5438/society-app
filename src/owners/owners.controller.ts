import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';
import { Req } from '@nestjs/common';

@ApiTags('Owners')
@ApiBearerAuth()
@Controller('owners')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  createOwner(@Body() dto: CreateOwnerDto) {
    return this.ownersService.create(dto);
  }

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Create new owner (Admin only)' })
  create(@Body() dto: CreateOwnerDto) {
    return this.ownersService.create(dto);
  }

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: 'Get all owners' })
  findAll() {
    return this.ownersService.findAll();
  }

  @Get(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Get one owner by ID' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ownersService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Update owner details' })
  @ApiParam({ name: 'id', type: Number })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateOwnerDto) {
    return this.ownersService.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete owner by ID' })
  @ApiParam({ name: 'id', type: Number })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ownersService.remove(id);
  }

  @Get('my-flats')
  @Roles('owner')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get flats for the logged-in owner' })
  getMyFlats(@Req() req) {
    console.log('🔐 req.user:', req.user);
    return this.ownersService.findFlatsByUserId(req.user.sub);
}
}