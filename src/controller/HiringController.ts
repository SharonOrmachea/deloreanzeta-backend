import { Request, Response } from 'express';
import { transporter } from '../config/mailer';
import { StatusCodes } from 'http-status-codes';
import { MAIL_BAND } from '../config/config';

class HiringController {

    static sendEmails = async (req: Request, res: Response) => {
        const { name, lastname, telephone, email, business, message } = req.body;
        if (!name || !lastname || !telephone || !email || !business || !message) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Complete all fields' });
        }
        
        try{
            let emailStatus = 'OK';
            
            //sendEmail
            try {
                // send mail with defined transport object
                // send mail admin
                await transporter.sendMail({
                    from: "Nuevo interesado en la banda",//sender address
                    to: MAIL_BAND, // list of receivers
                    subject: 'Posible contratación', // Subject line
                    text: `Información de contacto \nNombre completo: ${name} ${lastname} \nTeléfono: ${telephone} \nEmail: ${email} \nAsunto: ${business} \nMensaje: ${message}`, // plain text body
                    
                });
                //send mail visitor
                await transporter.sendMail({
                    from: '"Saludos" <deloreanzeta@example.com>', //sender address
                    to: email, // list of receivers
                    subject: 'Pronto nos comunicaremos', // Subject line
                    text: `Hola, pronto nos estaremos comunicando con vos, en caso de no establecer un contacto en los próximos días te dejaremos el número de contacto para comunicarte con nosotros.\nNumero: 1122334455\nMuchas gracias`, // plain text body
                });
            } catch (e) {
                emailStatus = e;
                return res.status(StatusCodes.BAD_REQUEST).json(emailStatus);
            }
        
            return res.status(StatusCodes.OK).json({ message: "Correo enviado correctamente" });
            
        }catch(e){
            throw new Error(e);
        }
    };

}

export default HiringController;