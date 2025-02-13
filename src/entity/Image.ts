// imports for creating a new entity
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	OneToMany,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { Product } from './Product';

@Entity()
export class Image extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	url: string;

	@Column({ type: 'blob' })
	data: Buffer;

	@Column()
	productId: number;

	@ManyToOne(() => Product, (product) => product.images)
	@JoinColumn({ name: 'productId' })
	product: Product;
}
