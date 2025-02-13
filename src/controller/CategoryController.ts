//import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { Category } from '../entity/Category';
import categoryRepository from '../repositories/CategoryRepository';
import { StatusCodes } from 'http-status-codes';

export class CategoryController {

	static getAll = async (req: Request, res: Response) => {
		try {
			const categories = await categoryRepository.findAll();
			return res.send(categories);
		} catch (e) {
			return res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.json({ message: 'Somenthing goes wrong' });
		}
	};

	static getById = async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const idInt = parseInt(id as string);
			const category = await categoryRepository.findById(idInt);
			return res.send(category);
		} catch (e) {
			return res.status(StatusCodes.NOT_FOUND).json({ message: 'Not result' });
		}
	};

	static newCategory = async (req: Request, res: Response) => {
		const { name } = req.body;
		const category = new Category();

		category.name = name;

		const validationOpt = {
			validationError: { target: false, value: false },
		};
		const errors = await validate(category, validationOpt);
		if (errors.length > 0) {
			return res.status(400).json(errors);
		}

		try {
			await categoryRepository.save(category);
			return res.status(StatusCodes.CREATED).send('Category created');
		} catch (e) {
			return res.status(409).json(e);
		}
	};

	static editCategory = async (req: Request, res: Response) => {
		const { id } = req.params;
		const idInt = parseInt(id as string);
		const { name } = req.body;

		try {
			const category = await categoryRepository.findById(idInt);
			category.name = name;

			const validationOpt = {
				validationError: { target: false, value: false },
			};
			const errors = await validate(category, validationOpt);
			if (errors.length > 0) {
				return res.status(StatusCodes.BAD_REQUEST).json(errors);
			}
			await categoryRepository.save(category);

			return res
				.status(StatusCodes.CREATED)
				.json({ message: 'Category updated' });
		} catch (e) {
			if (e.name === 'QueryFailedError') {
				return res
					.status(StatusCodes.INTERNAL_SERVER_ERROR)
					.json({ message: 'Something goes wrong' });
			}
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ message: 'Category not found' });
		}
	};

	static deleteCategory = async (req: Request, res: Response) => {
		const { id } = req.params;
		const idInt = parseInt(id as string);

		try {
			await categoryRepository.findById(idInt);
		} catch (e) {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ message: 'Category not found' });
		}

		try {
			categoryRepository.delete(id);
			return res
				.status(StatusCodes.CREATED)
				.json({ message: 'Category deleted' });
		} catch (error) {
			return res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.json({ message: 'Something goes wrong' });
		}
	};

}
