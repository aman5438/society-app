import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FlatsService {
  constructor(private prisma: PrismaService) {}

  async create(data: { flatNumber: string; type: string }) {
    return this.prisma.flat.create({ data });
  }

  async findAll() {
    return this.prisma.flat.findMany();
  }
}