import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Category } from './entity/Category';
import { Image } from './entity/Image';
import { Member } from './entity/Member';
import { New } from './entity/New';
import { Product } from './entity/Product';
import { Tour } from './entity/Tour';
import { User } from './entity/User';
import {
	DB_TYPE,
	DB_HOST,
	DB_PORT,
	DB_USER,
	DB_PASSWORD,
	DB_DATABASE,
} from './config/config';

const config: DataSourceOptions = {
	type: `${DB_TYPE}` as any,
	host: DB_HOST,
	port: DB_PORT as any,
	username: DB_USER,
	password: DB_PASSWORD,
	database: DB_DATABASE,
	entities: [Category, Image,Member, New, Product, Tour, User],
	synchronize: true,
	logging: false,
};

const conn = new DataSource(config);

// return new Promise with the execution of intilization of the connection
export const initialize = async (): Promise<void> => {
	return new Promise((resolve, reject) => {
		conn.initialize()
			.then(() => {
				console.log('Database connected');
				resolve();
			})
			.catch((error) => {
				console.log('Database connection failed');
				reject(error);
			});
	});
};

export default conn;
