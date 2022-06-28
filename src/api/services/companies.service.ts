import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { md5 } from '../../utils/helpers';
import { CompanyEntity } from '../../models/entities';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(CompanyEntity)
    private companyRepository: Repository<CompanyEntity>,
  ) {}

  createCompany(dto: Record<string, any>) {
    const company = this.companyRepository.create(dto);

    if (company.password) {
      company.password = md5(company.password);
    }

    return company;
  }

  async updateCompanies(dtoList: Record<string, any>[]) {
    const companies = dtoList.map(this.createCompany);

    await this.companyRepository.upsert(companies, {
      conflictPaths: ['id'],
      skipUpdateIfNoValuesChanged: true,
    });

    return companies;
  }

  async loginCompany(email: string, password: string) {
    const company = await this.companyRepository.findOne({
      where: { email, password: md5(password) },
    });

    if (company === null) {
      throw new NotFoundException('Company - Not Found');
    }

    return company;
  }
}
