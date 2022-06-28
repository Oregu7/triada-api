import { Module } from '@nestjs/common';

import { CompaniesController } from './controllers';
import { CompaniesService, CSVService } from './services';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService, CSVService],
})
export class ApiModule {}
