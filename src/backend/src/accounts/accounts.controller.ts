import { Controller, Get, Post, Body, Delete, Request, UseGuards } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.accountsService.signup(signupDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.accountsService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMyAccount(@Request() req: any) {
    return this.accountsService.findOne(req.user.account_id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async remove(@Request() req: any) {
    return this.accountsService.remove(req.user.account_id);
  }
}
