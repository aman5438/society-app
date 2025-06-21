import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { FlatsModule } from './flats/flats.module';
import { OwnersModule } from './owners/owners.module';
import { TenantsModule } from './tenants/tenants.module';

@Module({
  imports: [PrismaModule, AuthModule, FlatsModule, OwnersModule, TenantsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
