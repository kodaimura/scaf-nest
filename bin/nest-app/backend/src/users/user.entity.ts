import {
	Entity, 
	Column, 
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';


@Entity()
export class User {

	@PrimaryGeneratedColumn()
	uid: number;

	@Column({ unique: true, length: 50 })
	username: string;

	@Column()
	password: string;

	@CreateDateColumn({ precision: 0 })
	createAt: string;

	@UpdateDateColumn({ precision: 0 })
	updateAt: string;
}