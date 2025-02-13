import { Router } from 'express';
import { BannerController } from '../controller/BannerController';
import { validateBanner } from '../middlewares/banner.validator';
import { checkJwt } from "../middlewares/jwt";
import { checkRole } from "../middlewares/role";

const router = Router();

router.get('/', BannerController.getAll);
router.get('/:id', BannerController.getById);
router.post('/'/*,validateBanner*/, [/*checkJwt, checkRole(['admin'])*/], BannerController.createBanner);
router.put('/:id',validateBanner, [/*checkJwt, checkRole(['admin'])*/], BannerController.updateBanner);
router.patch('/:id',validateBanner, [/*checkJwt, checkRole(['admin'])*/], BannerController.updateBanner);
router.delete('/:id', [/*checkJwt, checkRole(['admin'])*/], BannerController.deleteBanner);

export default router;