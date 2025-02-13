import { Request, Response, NextFunction } from 'express';
import { User } from '../entity/User';
import { validate } from 'class-validator';
import userRepository from '../repositories/UserRepository';
import { StatusCodes } from 'http-status-codes';

export class UserController {

	static getAll = async (req: Request, res: Response) => {
		try {
			const users = await userRepository.findAll();
			return  res.status(StatusCodes.OK).json(users);
		} catch (error) {
            // check if is a typeorm error and thor error 500
            if (error.name === 'QueryFailedError') {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
            }
			return res.status(StatusCodes.BAD_REQUEST).json(error);
		}
	};

	static getByEmail = async (req: Request, res: Response) => {
		const { email } = req.params;
		try {
			const user = await userRepository.findByEmail(email);
			return res.status(StatusCodes.OK).json(user);
		} catch (error) {
            // check if is a typeorm error and thor error 500
            if (error.name === 'QueryFailedError') {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
            }
			return res.status(StatusCodes.BAD_REQUEST).json(error);
		}
	};

	static newUser = async (req: Request, res: Response) => {
		const { email, password, name, lastname, telephone } = req.body;
		const user = new User();

		user.email = email;
		user.password = password;
		user.name = name;
		user.lastname = lastname;
		user.telephone = telephone;
		user.role = 'cliente';
		user.resetToken = '';

		// validate
		const validationOpt = {
			validationError: { target: false, value: false },
		};
		const errors = await validate(user, validationOpt);
		if (errors.length > 0) {
			return res.status(StatusCodes.BAD_REQUEST).json(errors);
		}
		try {
			user.hashPassword();
			await userRepository.createUser(user);
			return res.status(StatusCodes.CREATED).json({"message": 'User created'});
		} catch (error) {
			return res.status(StatusCodes.CONFLICT).json(error);
		}
	};

	static editUser = async (req: Request, res: Response) => {
		const { id } = req.params;
		const idInt = parseInt(id as string);

		try {
			const { name, lastname, telephone } = req.body;
			const user = await userRepository.findById(idInt);
			user.name = name;
			user.lastname = lastname;
			user.telephone = telephone;
			
			const validationOpt = {
				validationError: { target: false, value: false },
			};
			const errors = await validate(user, validationOpt);
			if (errors.length > 0) {
				return res.status(StatusCodes.BAD_REQUEST).json({ message: errors });
			}
			await userRepository.updateUser(user);
			return res.status(StatusCodes.CREATED).json({ message: 'User updated' });
		} catch (error) {
			// check if is a typeorm error and thor error 500
			if (error.name === 'QueryFailedError') {
				return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
			}
			return res.status(StatusCodes.BAD_REQUEST).json(error);
		}
	};

	static deleteUser = async (req: Request, res: Response) => {
		const { id } = req.params;
        const idInt = parseInt(id as string);
		try {
			const user = await userRepository.findById(idInt);
            userRepository.deleteUser(user);
		} catch (error) {
            // check if is a typeorm error and thor error 500
            if (error.name === 'QueryFailedError') {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
            }
			return res.status(StatusCodes.BAD_REQUEST).json({ message: 'User not found' });
		}
		return res.status(StatusCodes.OK).json({ message: 'User deleted' });
	};

	static changeRole = async (req: Request, res: Response) => {
		const { id } = req.params;
        const idInt = parseInt(id as string);
		const { role } = req.body;

		try {
			const user = await userRepository.findById(idInt);
			user.role = role;
            userRepository.updateUser(user);
		} catch (e) {
            // check if is a typeorm error and thor error 500
            if (e.name === 'QueryFailedError') {
                return res
                    .status(StatusCodes.INTERNAL_SERVER_ERROR)
                    .json({ message: 'Internal server error' });
            }
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'User not found' });
		}

		return res.status(StatusCodes.OK).json({ message: 'Role update' });
	};
}

export default UserController;
