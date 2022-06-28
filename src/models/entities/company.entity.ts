import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('companies')
export class CompanyEntity {
  @PrimaryColumn('integer')
  id: number;

  @Column('varchar', { length: 300 })
  title: string;

  @Column('varchar', { length: 50 })
  type: string;

  @Column('datetime')
  createDT: Date;

  @Column('datetime')
  updateDT: Date;

  @Column('varchar', { length: 150 })
  email: string;

  @Column('varchar', { length: 100 })
  password: string;
}
