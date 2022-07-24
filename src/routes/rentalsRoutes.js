import express from 'express';
import { getRentals, rentGame, returnGame } from '../controllers/rentalsControllers.js';


const rentalsRouter = express.Router();

rentalsRouter.get('/rentals', getRentals)
rentalsRouter.post('/rentals', rentGame)
rentalsRouter.post('/rentals/:id/return', returnGame)
rentalsRouter.delete('/rentals/:id', )



export default rentalsRouter;