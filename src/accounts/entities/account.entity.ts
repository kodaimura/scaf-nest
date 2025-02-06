import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn()
  account_id: number;

  @Column({ unique: true, length: 150 })
  account_name: string;

  @Column()
  account_password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
