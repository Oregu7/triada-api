import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApiModule } from './api/api.module';
import { getTypeORMConfig } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: getTypeORMConfig }),
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
