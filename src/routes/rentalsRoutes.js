import express from 'express';
import { getRentals } from '../controllers/rentalsControllers.js';


const rentalsRouter = express.Router();

rentalsRouter.get('/rentals', getRentals)
rentalsRouter.post('/rentals', )
rentalsRouter.post('/rentals/:id/return', )
rentalsRouter.delete('/rentals/:id', )



export default rentalsRouter;