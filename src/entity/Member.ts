import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Member {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	profession: string;

	@Column()
	description: string;

	@Column({ type: 'longtext' })
	imageUrl: string;

}