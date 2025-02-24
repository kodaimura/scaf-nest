import { Controller, Get, Post, Body, Delete, Request, Res, UseGuards } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Response } from 'express';

@Controller('api/accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.accountsService.signup(signupDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const result = await this.accountsService.login(loginDto);
    
    res.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: parseInt(process.env.JWT_EXPIRATION || '2592000') * 1000,
    });
    return res.json({ message: 'Login successful' });
  }

  @Post('logout')
  async logout(@Request() req: Request, @Res() res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    return res.json({ message: 'Logout' });
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
