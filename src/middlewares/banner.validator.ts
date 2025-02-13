import { body } from 'express-validator';
import { validateResult } from './validate.helper';

export const validateBanner = [
	body('name')
		.exists()
		.withMessage("El campo nombre no fue ingresado")
	    .notEmpty()
		.withMessage('El campo nombre no puede estar vacio')
		.isString()
		.withMessage('El campo nombre debe ser una cadena de caracteres')
		.isLength({ min: 3 })
		.withMessage(
			'El campo nombre debe componerse de al menos 3 caracteres'
		)
		.custom((value, { req }) => {
			if (value.trim() == 0)
				throw new Error(
					'El campo nombre no puede componerse unicamente de espacios'
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