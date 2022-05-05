import { 
	Controller, 
	Req,
	Res, 
	Get, 
	Post, 
	UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';


@Controller()
export class AuthController {

	constructor(private authService: AuthService) {}

  	@Post('login')
  	@UseGuards(AuthGuard('local'))
  	async login(
  		@Req() req, 
  		@Res({ passthrough: true }) res
  	) {
  		const accessToken = {
  			token : await this.authService.createJwtToken(req.user)
  		}

  		res.cookie('access-token', accessToken, {httpOnly:true})
  		return accessToken
  	}


  	@Get('logout')
  	@UseGuards(AuthGuard('jwt'))
  	async logout(@Res({ passthrough: true }) res) {
  		res.cookie('access-token', '', {expires: new Date()});
  	}


  	@Get('profile')
  	@UseGuards(AuthGuard('jwt'))
  	async getJwt(@Req() req) {
  		return req.user;
  	}
}
