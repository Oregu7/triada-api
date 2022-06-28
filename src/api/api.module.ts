import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyEntity } from '../models/entities';
import { CompaniesController } from './controllers';
import { CompaniesService, CSVService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity])],
  controllers: [CompaniesController],
  providers: [CompaniesService, CSVService],
})
export class ApiModule {}
