import { Request, Response } from 'express';
import { User } from '../entity/User';
import * as jwt from 'jsonwebtoken';
import * as config from '../config/config';
import { validate } from 'class-validator';
import { transporter } from '../config/mailer';
import userRepository from '../repositories/UserRepository';
import { StatusCodes } from 'http-status-codes';

class AuthController {
	static login = async (req: Request, res: Response) => {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ message: 'Username & Password are required' });
		}
		try {
			const user = await userRepository.findByCredentials(
				email,
				password
			);
            const token = jwt.sign(
                { userId: user.id, username: user.email },
                config.JWT_SECRET,
                { expiresIn: '1d' }
            );
            res.status(StatusCodes.OK).json({ 
				"email":user.email,
				"name":user.name,
				"lastname":user.lastname,
				"telephone":user.telephone,
				"role":user.role,
				"token": token
			});
		} catch (e) {
			return res.status(400).json({ message: e.message });
		}
	};

	static changePassword = async (req: Request, res: Response) => {
		const { userId } = res.locals.jwtPayload;
		const { oldPassword, newPassword } = req.body;

		if (!oldPassword || !newPassword) {
			res.status(400).json({
				message: 'Old password and new password are required',
			});
		}
		let user: User;

		try {
			user = await userRepository.findOneOrFail({
				where: { id: userId },
			});
		} catch (e) {
			res.status(400).json({ message: 'Somenthing goes wrong' });
		}

		if (!user.checkPassword(oldPassword)) {
			return res.status(400).json({ message: 'Check your old password' });
		}
		user.password = newPassword;
		const validationOps = {
			validationError: { target: false, value: false },
		};
		const errors = await validate(validationOps);

		if (errors.length > 0) {
			return res.status(400).json(errors);
		}

		//Hash password
		user.hashPassword();
		userRepository.save(user);

		res.json({ message: 'Password change' });
	};

	static forgotPassword = async (req: Request, res: Response) => {
		const { email } = req.body;
		if (!email) {
			return res.status(400).json({ message: 'Username is required' });
		}
		const emailExist = await userRepository.findByEmail(email);	

		try{
			if(emailExist !== null){
				const message = 'Check your mail for a link to reset your password.';
				let verificationLink;
				let emailStatus = 'OK';
				let user: User;
				user = await userRepository.findOneOrFail({ where: { email } });
		
				const token = jwt.sign(
					{ username: user.email, cadenaSecret: "deloreanzeta" },
					config.JWT_SECRET_RESET,
					{ expiresIn: '10m' }
				);
				try {
					verificationLink = `http://localhost:4200/#/recover/password/${token}`;
					user.resetToken = token;
				
				} catch (e) {
					return res.json({ message });
				}
				//sendEmail
				try {/*
					// send mail with defined transport object
					await transporter.sendMail({
						from: '"Forgot password 👻" <deloreanzeta@example.com>', //sender address
						to: user.email, // list of receivers
						subject: 'Forgot password ✔', // Subject line
						//text: "Hello world?", // plain text body
						html: `<b>Please click on the following link, or paste this into your browser to complete the process:</b>
						<a href="${verificationLink}">${verificationLink}</a>`, // html body
					});*/
					console.log("todo ok")
				} catch (e) {
					emailStatus = e;
					return res.status(400).json(emailStatus);
				}
		
				try {
					await userRepository.save(user);
				} catch (e) {
					emailStatus = e;
					return res.status(400).json({ message: 'Something goes wrong' });
				}
				return res.json({message: token});
				return res.status(StatusCodes.OK).json({message: "Todo OK"});
			}else{
				return res.json({message: "email not found"});
			}
		}catch(e){
			throw new Error(e);
		}
	};

	static autorizationPassword = async(req: Request, res: Response) => {
		const token = req.headers.authorization;
		
		/*let jwtPayload = jwt.verify(token, "resetpassword");
		console.log("chekeo el payload: ",jwtPayload);*/
		
		const user = await userRepository.findOneOrFail({
			where: { resetToken: token },
		});
		
		if(token == user.resetToken){
			return res.status(StatusCodes.OK).json({ message: "Token valido"});
		}else{
			return res.status(StatusCodes.CONFLICT).json({message: "Token invalido"});
		}

	};

	static newPasswordReset = async(req: Request, res: Response) => {
		const token = req.headers.authorization;
		const { password, confirmPassword } = req.body;
	};

	static createNewPassword = async (req: Request, res: Response) => {
		const { newPassword } = req.body;
		const resetToken = req.headers.reset as string;

		if (!resetToken || !newPassword) {
			//if(!(resetToken && newPassword)){
			res.status(400).json({ message: 'All the fields are required' });
		}

		let jwtPayload;
		let user: User;

		try {
			jwtPayload = jwt.verify(resetToken, config.JWT_SECRET_RESET);
			user = await userRepository.findOneOrFail({
				where: { resetToken: resetToken },
			});
		} catch (error) {
			return res.status(401).json({ message: error });
		}

		user.password = newPassword;
		const validationsOps = {
			validationError: { target: false, value: false },
		};
		const errors = await validate(user, validationsOps);

		if (errors.length > 0) {
			return res.status(400).json(errors);
		}

		try {
			user.hashPassword();
			await userRepository.save(user);
		} catch (error) {
			return res.status(401).json({ message: error });
		}

		res.json({ message: 'Password changed' });
	};
}

export default AuthController;
