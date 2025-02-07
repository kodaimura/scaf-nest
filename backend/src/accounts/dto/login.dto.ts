import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  account_name: string;

  @IsNotEmpty()
  account_password: string;
}