import {
	Entity,
	PrimaryGeneratedColumn,
	Unique,
	CreateDateColumn,
	UpdateDateColumn,
	Column,
} from 'typeorm';
import { MinLength, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['email'])
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@MinLength(6)
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@Column()
	@MinLength(8)
	@IsNotEmpty()
	password: string;

	@Column()
	@MinLength(3)
	@IsNotEmpty()
	name: string;

	@Column()
	@MinLength(3)
	@IsNotEmpty()
	lastname: string;

	@Column()
	@IsOptional()
	telephone: string;

	@Column()
	@IsNotEmpty()
	role: string;

	@Column()
	@IsOptional()
	//@IsNotEmpty()
	resetToken: string;

	@Column()
	@CreateDateColumn()
	createdAt: string;

	@Column()
	@UpdateDateColumn()
	updateAt: string;

	hashPassword(): void {
		const salt = bcrypt.genSaltSync(10);
		this.password = bcrypt.hashSync(this.password, salt);
	}

	checkPassword(password: string): boolean {
		return bcrypt.compareSync(password, this.password);
	}
}
