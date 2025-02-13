import {NewController} from '../controller/NewController';
import { Router } from 'express';
import { checkJwt } from "../middlewares/jwt";
import { checkRole } from "../middlewares/role";
import { validateNew } from '../middlewares/new.validator';
const multer  = require('multer')
const upload = multer({ dest: './uploads/' })

const router = Router();
router.get('/', NewController.getAll);
router.get('/:id', NewController.getById);
router.post('/', validateNew, [/*checkJwt, checkRole(['admin']),upload.single('image')*/], NewController.createNew);
//router.put('/:id', validateNew, [/*checkJwt, checkRole(['admin'])*/], NewController.updateNew);
router.patch('/:id', validateNew, [/*checkJwt, checkRole(['admin'])*/], NewController.updateNew);
router.delete('/:id', [/*checkJwt, checkRole(['admin'])*/], NewController.deleteNew);

export default router;
