import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ModelEntity } from './_prototype/ModelEntity';

@Entity('companies')
export class CompanyEntity extends ModelEntity {
  @PrimaryColumn('integer')
  id: number;

  @Column('varchar', { length: 300 })
  title: string;

  @Column('varchar', { length: 50 })
  type: string;

  @Column('datetime')
  createDT: Date = new Date();

  @Column('datetime')
  updateDT: Date = new Date();

  @Column('varchar', { length: 150 })
  email: string;

  @Column('varchar', { length: 100 })
  password: string;

  // --------------------------------------
  // DTO
  // --------------------------------------

  dtoLogin() {
    const dto = {
      id: this.id,
      title: this.title,
    };

    return dto;
  }
}
