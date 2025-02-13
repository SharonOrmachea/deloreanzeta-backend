import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class New {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column()
	content: string;

	@Column({ type: 'longtext' })
	imageUrl: string;

	@Column()
	date: string;
}
