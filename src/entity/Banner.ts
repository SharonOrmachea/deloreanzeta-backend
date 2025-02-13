import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { MinLength, IsNotEmpty, MaxLength } from "class-validator";

@Entity()
export class Banner {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@MinLength(3)
	//@MaxLength(33)
	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	@Column({ type: 'longtext' })
	imageUrl: string;

}