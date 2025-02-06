import { IsNotEmpty, MinLength } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  account_name: string;

  @IsNotEmpty()
  @MinLength(6)
  account_password: string;
}