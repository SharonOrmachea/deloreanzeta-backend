import { body } from 'express-validator';
import { validateResult } from './validate.helper';

export const validateNew = [
	body('title')
		.exists()
		.withMessage("El campo titulo no fue ingresado")
	    .notEmpty()
		.withMessage('El campo titulo no puede estar vacio')
		.isString()
		.withMessage('El campo titulo debe ser una cadena de caracteres')
		.isLength({ min: 3 })
		.withMessage(
			'El campo titulo debe componerse de al menos 3 caracteres'
		)
		.isLength({ max: 33 })
		.withMessage(
			'El campo titulo debe componerse de a lo sumo 33 caracteres'
		)
		.custom((value, { req }) => {
			if (value.trim() == 0)
				throw new Error(
					'El campo titulo no puede componerse unicamente de espacios'
				);
			return true;
		}),
	body('content')
		.exists()
		.withMessage('El campo contenido no fue ingresado')
		.not()
		.isEmpty()
		.withMessage('El campo contenido no puede estar vacio')
		.isString()
		.withMessage('El campo contenido debe ser una cadena de caracteres')
		.isLength({ min: 3 })
		.withMessage(
			'El campo contenido debe componerse de al menos 3 caracteres'
		)
		.custom((value, { req }) => {
			if (value.trim() == 0)
				throw new Error(
					'El campo contenido no puede componerse unicamente de espacios'
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