import { body } from 'express-validator';
import { validateResult } from './validate.helper';

export const validateMail = [
	body("name")
        .exists()
        .withMessage("El campo nombre no fue ingresado")
        .not()
        .isEmpty()
        .withMessage("El campo nombre no puede estar vacio")
        .isString()
        .withMessage('El campo nombre debe ser una cadena de caracteres')
        .isLength({ min: 3 })
        .withMessage('El nombre debe componerse de al menos 3 caracteres')
        .custom((value, {req}) => {
            if(value.trim() == 0)
                throw new Error("El nombre no puede componerse unicamente de espacios");
            return true;
            }
        ),
	body("lastname")
        .exists()
        .withMessage("El campo apellido no fue ingresado")
        .not()
        .isEmpty()
        .withMessage("El campo apellido no puede estar vacio")
        .isString()
        .withMessage('El campo apellido debe ser una cadena de caracteres')
        .isLength({ min: 3 })
        .withMessage('El apellido debe componerse de al menos 3 caracteres')
        .custom((value, {req}) => {
            if(value.trim() == 0)
                throw new Error("El apellido no puede componerse unicamente de espacios");
            return true;
            }
        ),
    body('telephone')
		.exists()
		.withMessage('El campo telefono no fue ingresado')
		.not()
		.isEmpty()
		.withMessage('El telefono del usuario no puede estar vacio')
		.isString()
		.withMessage('El telefono del usuario debe ser una cadena de caracteres')
		.isLength({ min: 10 })
		.withMessage('El telefono del usuario debe componerse de al menos 10 caracteres')
		.custom((value, { req }) => {
			if (value.trim() == 0)
				throw new Error('El telefono no puede componerse por espacios');
			return true;
		})
		.custom((value, { req }) => {
			for (let i = 0; i < value.length; i++) {
				if (
					value[i] != 0 &&
					value[i] != 1 &&
					value[i] != 2 &&
					value[i] != 3 &&
					value[i] != 4 &&
					value[i] != 5 &&
					value[i] != 6 &&
					value[i] != 7 &&
					value[i] != 8 &&
					value[i] != 9
				) {
					throw new Error('El precio debe componerse unicamente de numeros');
				}
			}
			return true;
		}),
	body('email')
		.exists()
		.withMessage('El campo email no fue ingresado')
		.not()
		.isEmpty()
		.withMessage('El campo email no puede estar vacio')
		.isEmail()
		.withMessage('El campo email debe tener el formato de un correo valido')
		.custom((value, { req }) => {
			let caracteres = 0;
			let caracteresMinimos = 4;
			for (let i = 0; i < value.length; i++) {
				if (value[i] !== '@') {
					caracteres++;
				} else {
					break;
				}
			}
			if (caracteres < caracteresMinimos)
				throw new Error(
					'El email debe contener al menos 4 caracteres antes del @'
				);
			return true;
		}),
	body("business")
        .exists()
        .withMessage("El campo asunto no fue ingresado")
        .not()
        .isEmpty()
        .withMessage("El campo asunto no puede estar vacio")
        .isString()
        .withMessage('El campo asunto debe ser una cadena de caracteres')
        .isLength({ min: 3 })
        .withMessage('El nombre debe componerse de al menos 3 caracteres')
        .custom((value, {req}) => {
            if(value.trim() == 0)
                throw new Error("El nombre no puede componerse unicamente de espacios");
            return true;
            }
        ),
	(req, res, next) => {
		validateResult(req, res, next);
	},
];
