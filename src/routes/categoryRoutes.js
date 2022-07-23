import express from 'express';
import { getCategories, registerCategory } from '../controllers/categoryControllers.js';

const categoriesRouter = express.Router();

categoriesRouter.get('/categories', getCategories)
categoriesRouter.post('/categories', registerCategory)

export default categoriesRouter;