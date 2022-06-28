import { Injectable } from '@nestjs/common';
import * as csv from 'csvtojson';
import * as moment from 'moment';

import { FileMimeType } from '../../models/types';

// -----------------------------------------------------------------

export type MapperSchema<T> = {
  [K in keyof T]?: {
    field: string;
    type: 'string' | 'number' | 'boolean' | 'date';
  };
};

// -----------------------------------------------------------------

@Injectable()
export class CSVService {
  checkIsCSV(mimetype: string) {
    return mimetype === FileMimeType.csv;
  }

  parseCSV<T>(buffer: Buffer) {
    return new Promise<T[]>((resolve, reject) => {
      csv({ delimiter: ';' })
        .fromString(buffer.toString('utf-8'))
        .on('error', (error) => reject(error))
        .then((jsonArray) => resolve(jsonArray));
    });
  }

  mapper<T>(dtoList: T[], schema: MapperSchema<T>): Record<string, any>[] {
    const mappedDtoList: Record<string, any>[] = [];

    for (const dto of dtoList) {
      const mappedDto: Record<string, any> = {};

      for (const key of Object.keys(schema)) {
        let value: string | number | boolean | Date = String(dto[key]).trim();

        switch (schema[key].type) {
          case 'number':
            value = Number(value);
            break;

          case 'date':
            value = moment(value, 'DD.MM.YYYY h:mm:ss').toDate();
            break;

          case 'boolean':
            value = Boolean(value);
            break;
        }

        mappedDto[schema[key].field] = value;
      }

      mappedDtoList.push(mappedDto);
    }

    return mappedDtoList;
  }
}

// -----------------------------------------------------------------
