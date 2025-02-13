// initlaize the environment variables
import { config } from 'dotenv';
config();

export const PORT = process.env.PORT;

export const DB_TYPE = process.env.DB_TYPE;
export const DB_USER = process.env.DB_USER;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_DATABASE = process.env.DB_DATABASE;

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_SECRET_RESET = process.env.JWT_SECRET_RESET;
export const MAIL_HOST = process.env.MAIL_HOST;
export const MAIL_PORT = process.env.MAIL_PORT;
export const MAIL_CONTACT = process.env.MAIL_CONTACT;
export const MAIL_CONTACT_PASSWORD = process.env.MAIL_CONTACT_PASSWORD;
export const MAIL_BAND = process.env.MAIL_BAND;
export const MAIL_CONTACT_CLIENT_ID = process.env.MAIL_CONTACT_CLIENT_ID;
export const MAIL_CONTACT_CLIENT_SECRET = process.env.MAIL_CONTACT_CLIENT_SECRET;
export const OAUTH_REFRESH_TOKEN = process.env.OAUTH_REFRESH_TOKEN;
export const OAUTH_ACCESS_TOKEN = process.env.OAUTH_ACCESS_TOKEN;
