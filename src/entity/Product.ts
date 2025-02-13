import {
	Entity,
	PrimaryGeneratedColumn,
	Unique,
	Column,
	ManyToOne,
	OneToMany,
	Double,
} from 'typeorm';
import { MinLength, IsNotEmpty, IsOptional } from 'class-validator';
import { Category } from './Category';
import { Image } from './Image';
import { Blob } from 'buffer';

@Entity()
@Unique(['name'])
export class Product {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@MinLength(3)
	@IsNotEmpty()
	name: string;

	@Column({type: "double"})
	@MinLength(3)
	@IsNotEmpty()
	price: Double;
	
	@Column()
	@MinLength(3)
	@IsNotEmpty()
	discount: Number;

	@Column()
	@MinLength(10)
	@IsNotEmpty()
	description: string;

	@Column()
	@MinLength(20)
	@IsOptional()
	information: string;

	@OneToMany(() => Image, (image) => image.product)
	images: Blob[];

	@ManyToOne(() => Category, (category) => category.products)
	category: Category;
}
