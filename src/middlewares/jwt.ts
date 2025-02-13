import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as config from '../config/config';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
	const token = <string>req.headers['auth'];
	let jwtPayload;

	try {
		jwtPayload = <any>jwt.verify(token, config.JWT_SECRET);
		res.locals.jwtPayload = jwtPayload;
	} catch (e) {
		return res.status(401).send({ messege: 'Not authorized' });
	}

	const { userId, username } = jwtPayload;
	const newToken = jwt.sign({ userId, username }, config.JWT_SECRET, {
		expiresIn: '1y',
	});
	next();
};