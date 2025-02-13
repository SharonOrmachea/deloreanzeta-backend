import conn from '../dbConnection';
import { Category } from '../entity/Category';

const CategoryRepository = conn.getRepository(Category).extend({
	// custom methods
	async findByName(name: string): Promise<Category> {
		return await this.findOneBy({ name });
	},
	async findById(id: number): Promise<Category> {
		return await this.findOneBy({ id });
	},
	async findAll(): Promise<Category[]> {
		const categories = await this.createQueryBuilder('category').getMany();
		return categories;
	},
	async saveCategory(category: Category): Promise<Category> {
		return await this.save(category);
	},
	async createCategory(category: Category): Promise<Category> {
		return await this.create(category);
	},
});

export default CategoryRepository;
