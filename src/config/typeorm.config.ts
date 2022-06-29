import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { CompanyEntity } from '../models/entities';

export const getTypeORMConfig = async (): Promise<TypeOrmModuleOptions> => {
  const typeormConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST ?? 'db',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USER ?? 'admin',
    password: process.env.DB_PASSWORD ?? 'admin',
    database: process.env.DB_DATABASE ?? 'triada_db',
    entities: [CompanyEntity],
    synchronize: true,
  };

  return typeormConfig;
};
