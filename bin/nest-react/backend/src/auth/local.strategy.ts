import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { User } from '../users/user.entity';
import { AuthService } from './auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  	constructor(private authService: AuthService) {
  		super({
        	usernameField: 'username', //デフォルトのまま
        	passwordField: 'password', //デフォルトのまま
    	});
  	}

  	//戻り値が req.user に反映される
  	async validate(username: User['username'], password: User['password']) {
    	const user = await this.authService.validateUser(username, password);
    	if (!user) {
      		throw new UnauthorizedException();
    	}
    	return user;
  	}
}