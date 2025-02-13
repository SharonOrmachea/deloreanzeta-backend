// definition of the New repository
import conn from '../dbConnection';
import { New } from '../entity/New';

const NewRepository = conn.getRepository(New).extend({
	// custom methods
	async findAll(): Promise<New[]> {
		const news = await this.createQueryBuilder('new').getMany();
		return news;
	},
	async findById(id: number): Promise<New> {
		const neww = await this.createQueryBuilder('new')
			.where('new.id = :id', { id })
			.getOneOrFail();
		return neww;
	},
	async saveNew(neww: New): Promise<New> {
		return await this.save(neww);
	},
	async createNew(neww: New): Promise<New> {
		return await this.create(neww);
	},
	async updateNew(neww: New): Promise<New> {
		return await this.save(neww);
	},
	async deleteNew(neww: New): Promise<New> {
		return await this.remove(neww);
	},
});

export default NewRepository;
