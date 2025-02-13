import * as nodemailer from 'nodemailer';
// import all mail config variables from config.ts
import {
	MAIL_CONTACT,
	MAIL_CONTACT_PASSWORD,
	MAIL_HOST,
	MAIL_PORT,
} from './config';


export const transporter = nodemailer.createTransport({
	host: MAIL_HOST,
	port: MAIL_PORT,
	secure: true, // true for 465, false for other ports
	auth: {
		user: MAIL_CONTACT, // generated ethereal user
		pass: MAIL_CONTACT_PASSWORD, // generated ethereal password
	},
});

transporter.verify().then(() => {
	console.log('Ready for send emails');
});
