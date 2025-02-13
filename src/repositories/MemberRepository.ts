// definition of the New repository
import conn from '../dbConnection';
import { Member } from '../entity/Member';

const MemberRepository = conn.getRepository(Member).extend({
	// custom methods
	async findAll(): Promise<Member[]> {
		const members = await this.createQueryBuilder('new').getMany();
		return members;
	},
	async findById(id: number): Promise<Member> {
		const member = await this.createQueryBuilder('new')
			.where('new.id = :id', { id })
			.getOneOrFail();
		return member;
	},
	async saveNew(member: Member): Promise<Member> {
		return await this.save(member);
	},
	async createNew(member: Member): Promise<Member> {
		return await this.create(member);
	},
	async updateNew(member: Member): Promise<Member> {
		return await this.save(member);
	},
	async deleteNew(member: Member): Promise<Member> {
		return await this.remove(member);
	},
});

export default MemberRepository;