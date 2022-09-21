import express from "express";
import { homeController, newController, singleController, putController, delController, addController, pageNotFound } from "../controllers/homeController.js";
const router = express.Router();
router.get('/', homeController);
router.get('/items/new', addController);
router.get('/items/save', newController);
router.get('/items/', homeController);
router.get('/items/:id', singleController);
router.post('/items/', newController);
router.put('/items/:id', putController);
router.delete('/items/:id', delController);
router.get('/*', pageNotFound);

export default router;