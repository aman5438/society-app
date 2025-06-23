import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OwnersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateOwnerDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Step 1: Create user with role = 'owner'
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        role: 'owner',
      },
    });

    // Step 2: Create owner and link to created user
    return this.prisma.owner.create({
      data: {
        name: data.name,
        contact: data.contact,
        flatId: data.flatId,
        userId: user.id,
      },
    });
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

  findFlatsByUserId(userId: number) {
    return this.prisma.owner.findMany({
      where: { userId },
      include: { flat: true },
    });
  }
}
