import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

import { Payload } from './jwt.strategy';


@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	){}

	//認証処理
	async validateUser(username: User['username'], pass: User['password']) {
		const user = await this.usersService.findOne(username);
    	if (user && user.password === this.usersService.hashPassword(pass)) {
      		const { password, ...result } = await user;
      		return result;
    	}

    	return null;
  	}

  	async createJwtToken(user: any) {
    	const payload: Payload = { uid: user.uid, username: user.username };
    	return this.jwtService.sign(payload)
  	}

}