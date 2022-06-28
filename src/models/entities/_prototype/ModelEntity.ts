import { BaseEntity } from 'typeorm';

export class ModelEntity extends BaseEntity {
  // ----------------------------
  // Static Methods
  // ----------------------------

  static createFrom<T extends ModelEntity>(
    this: (new () => T) & typeof ModelEntity,
    dto: Partial<{ [K in keyof T]?: any }>,
  ): T {
    const instance = new this();

    for (const key of Object.keys(dto) as (keyof T)[]) {
      instance[key] = dto[key];
    }

    return instance;
  }
}
