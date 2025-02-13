import { Router } from "express";
//const upload = require  ("../middlewares/storage.multer");
const multer  = require('multer')
const upload = multer({ dest: './uploads/' })
//import { StatusCodes } from "http-status-codes";

const router = Router();

router.post('/profile', upload.single('image'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  return res.status(200).json({messege: "Imagen subida"});
})

export default router;