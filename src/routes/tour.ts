import { Router } from "express";
import { TourController } from "../controller/TourController";
import { validateTour } from "../middlewares/tour.validator";
import { checkRole } from "../middlewares/role";

const router = Router();

router.get("/", TourController.getAll);

router.get("/:id", TourController.getById);

router.post("/", validateTour, [/*checkJwt, checkRole(['admin'])*/], TourController.newTour);

router.patch("/:id", validateTour, [/*checkJwt, checkRole(['admin'])*/], TourController.editTour);

router.delete("/:id", [/*checkJwt, checkRole(['admin'])*/], TourController.deleteTour);

export default router;