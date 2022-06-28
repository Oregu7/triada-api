import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isDate } from 'class-validator';

import { md5 } from '../../utils/helpers';
import { CompanyEntity } from '../../models/entities';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(CompanyEntity)
    private companyRepository: Repository<CompanyEntity>,
  ) {}

  createCompany(dto: Record<string, any>) {
    const company = CompanyEntity.createFrom(dto);

    if (company.password) {
      company.password = md5(company.password);
    }

    if (isDate(company.createDT) === false) {
      company.createDT = new Date();
    }

    if (isDate(company.updateDT) === false) {
      company.updateDT = new Date();
    }

    return company;
  }

  async updateCompanies(dtoList: Record<string, any>[]) {
    const companies = dtoList.map(this.createCompany.bind(this));

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
