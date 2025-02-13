// definition of the User repository
import conn from '../dbConnection';
import { User } from '../entity/User';

const UserRepository = conn.getRepository(User).extend({
	// custom methods
	async findByEmail(email: string): Promise<User> {
		const user = await this.createQueryBuilder('user')
			.where('user.email = :email', { email })
			.getOneOrFail();
			return user;
	},
	async findById(id: number): Promise<User> {
		return await this.findOneBy({id});
	},
	async findAll(): Promise<User[]> {
		const users = await this.createQueryBuilder('user').getMany();
		return users;
	},
	async findByCredentials(email: string, password: string): Promise<User> {
		// getting the user by email and password
		const user = await this.createQueryBuilder('user')
			.where('user.email = :email', { email })
			.getOneOrFail();
		// if the user exists and the password is correct
		if (user && user.checkPassword(password)) {
			return user;
		}
		throw new Error('User or password incorrect');
	},
	async saveUser(user: User): Promise<User> {
		return await this.save(user);
	},
	async createUser(user: User): Promise<User> {
		const result = await this.save(user);
		//console.log(result);
		return result;
	},
	async updateUser(user: User): Promise<User> {
		return await this.save(user);
	},
	async deleteUser(user: User): Promise<User> {
		return await this.remove(user);
	},
});

export default UserRepository;
