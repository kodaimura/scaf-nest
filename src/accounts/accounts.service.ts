import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
    private jwtService: JwtService,
  ) { }

  async signup(signupDto: SignupDto): Promise<Account> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(signupDto.account_password, saltRounds);

    const newAccount = this.accountsRepository.create({
      ...signupDto,
      account_password: hashedPassword,
    });

    return await this.accountsRepository.save(newAccount);
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const account = await this.accountsRepository.findOne({
      where: { account_name: loginDto.account_name },
    });

    if (!account) {
      throw new UnauthorizedException('Invalid account_name or password');
    }

    const isMatch = await bcrypt.compare(loginDto.account_password, account.account_password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid account_name or password');
    }

    const payload = { account_id: account.account_id, account_name: account.account_name };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  async findOne(id: number): Promise<Account | null> {
    return await this.accountsRepository.findOne({ where: { account_id: id } });
  }

  async remove(id: number): Promise<void> {
    await this.accountsRepository.delete(id);
  }
}
