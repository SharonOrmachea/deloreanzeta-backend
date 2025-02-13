import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { Tour } from '../entity/Tour';
import tourRepository from '../repositories/TourRepository';
import { StatusCodes } from 'http-status-codes';
//import moment = require('moment');
const moment = require('moment-timezone');
export class TourController {

	static getAll = async (req: Request, res: Response) => {
		try {
			const tours = await tourRepository.findAll();
			return res.status(StatusCodes.OK).send(tours);
		} catch (error) {
			if(error.name === 'QueryFailedError') {
				return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
			}
			return res.status(StatusCodes.BAD_REQUEST).json(error);
		}
	};

	static getById = async (req: Request, res: Response) => {
		const { id } = req.params;
		const idInt = parseInt(id as string);
		try {
			const tour = await tourRepository.findById(idInt);
			return res.status(StatusCodes.OK).send(tour);
		} catch (error) {
			if (error.name === 'QueryFailedError') {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
			}
			return res.status(StatusCodes.BAD_REQUEST).json(error);
		}
	};

	static newTour = async (req: Request, res: Response) => {
		const { place, date, city } = req.body;
		const tour = new Tour();

		tour.place = place;
		//let dateActual = new Date()
		//tour.date = moment(date).format('YYYY-MM-DDTHH:mm:ss.SSSZ').substring(0, 19).concat('.000-00:00');
        console.log(date, " date es del tipo: ", typeof(date));
		const horaServidor = new Date(date);
		console.log(horaServidor);
		//const horaArgentina = moment(horaServidor).tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DD HH:mm:ss');
		tour.date = date;
		console.log(tour.date);
		
		tour.city = city;

		const validationOpt = {
			validationError: { target: false, value: false },
		};
		const errors = await validate(tour, validationOpt);
		if (errors.length > 0) {
			return res.status(StatusCodes.BAD_REQUEST).json(errors);
		}
		try {
			await tourRepository.save(tour);
			return res.status(StatusCodes.CREATED).send('Tour created');
		} catch (error) {
			return res.status(StatusCodes.CONFLICT).json(error);
		}
	};

	static editTour = async (req: Request, res: Response) => {
		const { id } = req.params;
		const idInt = parseInt(id as string);
		const { place, date, city } = req.body;

		try {
			const tour = await tourRepository.findById(idInt);
			tour.place = place;
            tour.date = date;
            tour.city = city;

			const validationOpt = {
				validationError: { target: false, value: false },
			};
			const errors = await validate(tour, validationOpt);
			if (errors.length > 0) {
				return res.status(StatusCodes.BAD_REQUEST).json(errors);
			}
			await tourRepository.save(tour);
			return res.status(StatusCodes.CREATED).json({ message: 'Tour updated' });
		
		} catch (error) {
			if (error.name === 'QueryFailedError') {
				return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something goes wrong' });
			}
			return res.status(StatusCodes.BAD_REQUEST).json(error);
		}
	};

	static deleteTour = async (req: Request, res: Response) => {
		const { id } = req.params;
		const idInt = parseInt(id as string);
		try {
			await tourRepository.findById(idInt);
		} catch (e) {
			return res.status(StatusCodes.NOT_FOUND).json({ message: 'Tour not found' });
		}
		try {
			tourRepository.delete(id);
			return res.status(StatusCodes.CREATED).json({ message: 'Tour deleted' });
		} catch (error) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something goes wrong' });
		}
	};
}
