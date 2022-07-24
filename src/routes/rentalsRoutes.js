import express from 'express';
import { deleteRent, getRentals, rentGame, returnGame } from '../controllers/rentalsControllers.js';


const rentalsRouter = express.Router();

rentalsRouter.get('/rentals', getRentals)
rentalsRouter.post('/rentals', rentGame)
rentalsRouter.post('/rentals/:id/return', returnGame)
rentalsRouter.delete('/rentals/:id', deleteRent)



export default rentalsRouter;