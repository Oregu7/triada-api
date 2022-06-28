import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
  UsePipes,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ICompanyDraft } from '../../models/interfaces';
import { AuthCompanyDto } from '../dto/company.dto';
import { CompaniesService, CSVService } from '../services';

// -----------------------------------------------------------------

@Controller('companies')
export class CompaniesController {
  constructor(
    private companiesService: CompaniesService,
    private csvService: CSVService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (this.csvService.checkIsCSV(file.mimetype) === false) {
      throw new BadRequestException('Only csv files are supported');
    }

    const draftCompaniesList = await this.csvService.parseCSV<ICompanyDraft>(
      file.buffer,
    );

    const dtoCompaniesList = this.csvService.mapper(draftCompaniesList, {
      ID: {
        field: 'id',
        type: 'number',
      },
      'Название компании': {
        field: 'title',
        type: 'string',
      },
      'Тип компании': {
        field: 'type',
        type: 'string',
      },
      'Дата создания': {
        field: 'createDT',
        type: 'date',
      },
      'Дата изменения': {
        field: 'updateDT',
        type: 'date',
      },
      'email для входа в личный кабинет': {
        field: 'email',
        type: 'string',
      },
      'пароль для входа в личный кабинет': {
        field: 'password',
        type: 'string',
      },
    });

    await this.companiesService.updateCompanies(dtoCompaniesList);

    return { success: true };
  }

  @Post('auth')
  @UsePipes(new ValidationPipe())
  async loginCompany(@Body() dto: AuthCompanyDto) {
    const { email, password } = dto;

    const company = await this.companiesService.loginCompany(email, password);

    return company.dtoLogin();
  }
}

// -----------------------------------------------------------------
