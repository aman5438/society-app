import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOwnerDto } from './dto/create-owner.dto';

@Injectable()
export class OwnersService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateOwnerDto) {
    return this.prisma.owner.create({ data });
  }

  findAll() {
    return this.prisma.owner.findMany({ include: { flat: true, user: true } });
  }

  findOne(id: number) {
    return this.prisma.owner.findUnique({ where: { id }, include: { flat: true, user: true } });
  }

  update(id: number, data: Partial<CreateOwnerDto>) {
    return this.prisma.owner.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.owner.delete({ where: { id } });
  }
}