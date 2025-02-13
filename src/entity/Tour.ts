import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { MinLength, IsNotEmpty } from "class-validator";

@Entity()
export class Tour {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({type: "datetime"})
	@IsNotEmpty()
	date: string;

	@Column()
	@MinLength(3)
	@IsNotEmpty()
	place: string;

	@Column()
	@MinLength(3)
	@IsNotEmpty()
	city: string;
}
