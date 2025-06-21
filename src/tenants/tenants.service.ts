import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTenantDto } from './dto/create-tenant.dto';

@Injectable()
export class TenantsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateTenantDto) {
    return this.prisma.tenant.create({ data });
  }

  findAll() {
    return this.prisma.tenant.findMany();
  }

  findOne(id: number) {
    return this.prisma.tenant.findUnique({ where: { id } });
  }

  update(id: number, data: Partial<CreateTenantDto>) {
    return this.prisma.tenant.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.tenant.delete({ where: { id } });
  }
}
