import {IsNotEmpty, Length} from 'class-validator';


export class SignupDTO {
	@IsNotEmpty()
	@Length(1, 50)
	username: string;

	@IsNotEmpty()
	password: string;
}