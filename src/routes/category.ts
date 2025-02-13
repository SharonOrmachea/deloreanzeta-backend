import { CategoryController } from "../controller/CategoryController";
import { Router } from "express";
import { checkRole } from "../middlewares/role";
import { validateCategory } from "../middlewares/category.validator";
import { checkJwt } from "../middlewares/jwt";

const router = Router();

router.get("/", CategoryController.getAll);

router.get("/:id", CategoryController.getById);

router.post("/", validateCategory, [/*checkJwt, checkRole(['admin'])*/], CategoryController.newCategory);

router.patch("/:id", validateCategory, [/*checkJwt, checkRole(['admin'])*/], CategoryController.editCategory);

//router.delete("/:id", [/*checkJwt, checkRole(['admin'])*/], CategoryController.deleteCategory);

export default router;