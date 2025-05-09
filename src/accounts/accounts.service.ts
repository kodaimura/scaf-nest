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
    const hashedPassword = await bcrypt.hash(signupDto.password, saltRounds);

    const newAccount = this.accountsRepository.create({
      ...signupDto,
      password: hashedPassword,
    });

    return await this.accountsRepository.save(newAccount);
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const account = await this.accountsRepository.findOne({
      where: { name: loginDto.name },
    });

    if (!account) {
      throw new UnauthorizedException('Invalid name or password');
    }

    const isMatch = await bcrypt.compare(loginDto.password, account.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid name or password');
    }

    const payload = { id: account.id, name: account.name };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  async findOne(id: number): Promise<Account | null> {
    return await this.accountsRepository.findOne({ where: { id: id } });
  }

  async remove(id: number): Promise<void> {
    await this.accountsRepository.delete(id);
  }
}
