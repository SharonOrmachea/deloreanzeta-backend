// definition of the Banner repository
import conn from '../dbConnection';
import { Banner } from '../entity/Banner';

const BannerRepository = conn.getRepository(Banner).extend({
	// custom methods
	async findAll(): Promise<Banner[]> {
		const banner = await this.createQueryBuilder('banner').getMany();
		return banner;
	},
	async findById(id: number): Promise<Banner> {
		const banner = await this.createQueryBuilder('banner')
			.where('banner.id = :id', { id })
			.getOneOrFail();
		return banner;
	},
	async saveBanner(banner: Banner): Promise<Banner> {
		return await this.save(banner);
	},
	async createBanner(banner: Banner): Promise<Banner> {
		return await this.create(banner);
	},
	async updateBanner(banner: Banner): Promise<Banner> {
		return await this.save(banner);
	},
	async deleteBanner(banner: Banner): Promise<Banner> {
		return await this.remove(banner);
	},
});

export default BannerRepository;