import { 
	Post, 
	Put, 
	Req,
	Body,
	Controller,
	UseGuards 
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import { UsersService } from './users.service';
import { SignupDTO } from './users.dto';


@Controller()
export class UsersController {

	constructor(private usersService: UsersService) {}

	@Post('signup')
  	async signup(
  		@Body() signupDTO: SignupDTO
  	) {
  		return this.usersService.signup(signupDTO);
  	}

  	@Put('password')
  	@UseGuards(AuthGuard('jwt'))
  	async changePassword(
  		@Body('password') password,
  		@Req() req
  	) {
  		return this.usersService.changePassword(req.user.uid, password);
  	}
}
