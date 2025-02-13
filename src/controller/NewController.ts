import { Request, Response } from 'express';
import newRepository from '../repositories/NewRepository';
import { StatusCodes } from 'http-status-codes';
import { New } from '../entity/New';
import moment = require('moment');
import { validate } from 'class-validator';

export class NewController {
	static getAll = async (req: Request, res: Response) => {
		try{
			const news = await newRepository.findAll();
			return res.status(StatusCodes.OK).json(news);
		}catch(error){
			if (error.name === 'QueryFailedError') {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
            }
			return res.status(StatusCodes.BAD_REQUEST).json({ error: error });
		}
	};

	static getById = async (req: Request, res: Response) => {
		const { id } = req.params;
		const idInt = parseInt(id as string);
		try{
			const neww = await newRepository.findById(idInt);
			return res.status(StatusCodes.OK).json(neww);
		}catch(error){
			if (error.name === 'QueryFailedError') {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
            }
			return res.status(StatusCodes.BAD_REQUEST).json({ error: error });
		}
	};

	static createNew = async (req: Request, res: Response) => {
		const { title, content, imageUrl } = req.body;

		const neww = new New();
		neww.title = title;
		neww.content = content;
		neww.description = content.substring(0, 50) + '...';
		neww.imageUrl = imageUrl;
        const date = moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
        neww.date = date.substring(0, 19).concat('.000-00:00');
		
		try {
			await newRepository.save(neww);
			return res.status(StatusCodes.CREATED).json({ message: 'News created' });
		} catch (error) {
			return res.status(StatusCodes.CONFLICT).json({ "errors": error });
		}
	};

	static updateNew = async (req: Request, res: Response) => {
		const { id } = req.params;
		const idInt = parseInt(id as string);
		const { title, content, imageUrl } = req.body;
		let neww;
		try {
			neww = await newRepository.findById(idInt);
			neww.title = title;
			neww.content = content;
			neww.description = content.substring(0, 50) + '...';
			neww.imageUrl = imageUrl;
			const date = moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
	        neww.date = date.substring(0, 19).concat('.000-00:00');
		} catch(error){
			if (error.name === 'QueryFailedError') {
				return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
			}
			return res.status(StatusCodes.BAD_REQUEST).json(error);
		}
		try {
			await newRepository.updateNew(neww);
			return res.status(StatusCodes.OK).json({ message: "new update" });
		} catch (error) {
			return res.status(StatusCodes.BAD_REQUEST).json({ "error": error });
		}
	};

	static deleteNew = async (req: Request, res: Response) => {
		const { id } = req.params;
		const idInt = parseInt(id as string);
		let neww;
		try{
			neww = await newRepository.findById(idInt);
		}catch(error){
			if (error.name === 'QueryFailedError') {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
            }
			return res.status(StatusCodes.BAD_REQUEST).json({ "error": error });
		}
		try{
			await newRepository.deleteNew(neww);
			return res.status(StatusCodes.OK).json({ message: 'New deleted' });
		}catch(error){
			return res.status(StatusCodes.BAD_REQUEST).json({ "error": error });
		}
	};
}
