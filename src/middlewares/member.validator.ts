import { body } from 'express-validator';
import { validateResult } from './validate.helper';

export const validateMember = [
	body('name')
		.exists()
		.withMessage('El campo nombre no fue ingresado')
		.not()
		.isEmpty()
		.withMessage('El nombre del miembro de la banda no puede estar vacio')
		.isString()
		.withMessage('El nombre debe ser una cadena de caracteres')
		.isLength({ min: 4 })
		.withMessage(
			'El nombre del miembro de la banda debe componerse de al menos 4 caracteres'
		)
		.isLength({ max: 15 })
		.withMessage(
			'El nombre del miembro de la banda debe componerse de a lo sumo 15 caracteres'
		)		
		.custom((value, { req }) => {
			if (value.trim() == 0)
				throw new Error(
					'El nombre no puede componerse unicamente de espacios'
				);
			return true;
		}),
	body('profession')
		.exists()
		.withMessage('El campo profesion no fue ingresado')
		.not()
		.isEmpty()
		.withMessage('El campo de la profesion no puede estar vacio')
		.isString()
		.withMessage('El campo profesion debe ser una cadena de caracteres')
		.isLength({ min: 4 })
		.withMessage(
			'El campo de profesion debe componerse de al menos 4 caracteres'
		)
		.isLength({ max: 20 })
		.withMessage(
			'El campo profesion debe componerse de a lo sumo 20 caracteres'
		)
		.custom((value, { req }) => {
			if (value.trim() == 0)
				throw new Error(
					'El campo de la profesion no puede componerse unicamente de espacios'
				);
			return true;
		}),	
	body('description')
		.exists()
		.withMessage('El campo descripcion no fue ingresado')
		.not()
		.isEmpty()
		.withMessage('El campo descripcion no puede estar vacio')
		.isString()
		.withMessage('El campo descripcion debe ser una cadena de caracteres')
		.isLength({ min: 4 })
		.withMessage(
			'El campo descripcion debe componerse de al menos 4 caracteres'
		)
		.isLength({ max: 790 })
		.withMessage(
			'El campo descripcion debe componerse de a lo sumo 790 caracteres'
		)
		.custom((value, { req }) => {
			if (value.trim() == 0)
				throw new Error(
					'El campo descripcion no puede componerse unicamente de espacios'
				);
			return true;
		}),
		body('imageUrl')
			.exists()
			.withMessage('El campo imagen no fue ingresado')
			.not()
			.isEmpty()
			.withMessage('El campo imagen no puede estar vacio')
			.isString()
			.withMessage('El campo imagen debe ser una cadena de caracteres')
			.custom((value, { req }) => {
				if (value.trim() == 0)
					throw new Error(
						'El campo imagen no puede componerse unicamente de espacios'
					);
				return true;
			}),
	(req, res, next) => {
		validateResult(req, res, next);
	},
];