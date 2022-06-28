import { IsString, Length } from 'class-validator';

export class AuthCompanyDto {
  @IsString()
  @Length(1, 150)
  email: string;

  @IsString()
  @Length(1, 100)
  password: string;
}
