import {
	Entity,
	PrimaryGeneratedColumn,
	Unique,
	Column,
	OneToMany,
} from 'typeorm';
import { MinLength, IsNotEmpty } from 'class-validator';
import { Product } from './Product';

@Entity()
@Unique(['name'])
export class Category {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@MinLength(3)
	@IsNotEmpty()
	name: string;

	@OneToMany(() => Product, (product) => product.category)
	products: Product[];
}
