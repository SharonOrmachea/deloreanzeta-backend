import { body } from 'express-validator';
import { validateResult } from './validate.helper';

export const validateTour = [
	body('place')
		.exists()
		.withMessage('El nombre del tour no fue ingresado')
		.not()
		.isEmpty()
		.withMessage('El nombre del tour no puede estar vacio')
		.isString()
		.withMessage('El nombre del tour debe ser una cadena de caracteres')
		.isLength({ min: 3 })
		.withMessage(
			'El nombre del tour debe componerse de al menos 3 caracteres'
		)
		.custom((value, { req }) => {
			if (value.trim() == 0)
				throw new Error(
					'El nombre no puede componerse unicamente de espacios'
				);
			return true;
		}),
	body('city')
		.exists()
		.withMessage('El campo dirección no fue ingresado')
		.not()
		.isEmpty()
		.withMessage('El campo dirección no puede estar vacio')
		.isString()
		.withMessage('El campo dirección debe ser una cadena de caracteres')
		.isLength({ min: 3 })
		.withMessage(
			'El campo dirección debe componerse de al menos 3 caracteres'
		)
		.custom((value, { req }) => {
			if (value.trim() == 0)
				throw new Error(
					'El campo dirección no puede componerse unicamente de espacios'
				);
			return true;
		}),
	(req, res, next) => {
		validateResult(req, res, next);
	},
];
