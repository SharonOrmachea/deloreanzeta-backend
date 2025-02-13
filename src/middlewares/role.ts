import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import userRepository from '../repositories/UserRepository';

export const checkRole = (roles: Array<String>) => {
	return async (_, res: Response, next: NextFunction) => {
		try {
			const { userId } = res.locals.jwtPayload;
            const { role } = await userRepository.findOneOrFail(userId);
            if (roles.includes(role)) {
                next();
            } else {
                throw new Error('Not Authorized');
            }
		} catch (e) {
			return res.status(StatusCodes.UNAUTHORIZED).json({ message: e.message });
		}
	};
};
