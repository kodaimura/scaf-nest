import { Injectable, ConflictException  } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';

import { User } from './user.entity';
import { SignupDTO } from './users.DTO';


@Injectable()
export class UsersService {

	constructor(
    	@InjectRepository(User)
    	private readonly userRepository: Repository<User>
  	) {}

	hashPassword (password: string){
		return crypto
			.createHash('sha256')
			.update(password)
			.digest('hex')
	}

  	async findOne(username: User['username']): Promise<User | undefined> {
   		return this.userRepository.findOne({ where: { username } });
  	}

  	async signup(signupDTO: SignupDTO): Promise<void> {
  		if(await this.findOne(signupDTO.username)) {
  			throw new ConflictException();
  		}

  		await this.userRepository.insert({
  			...signupDTO,
  			password: this.hashPassword(signupDTO.password)
  		});

  		return;
  	}

  	async changePassword(uid: User['uid'], password: string): Promise<void> {
  		await this.userRepository.update({uid}, {
  			password: this.hashPassword(password)
  		});

  		return;
  	}

}