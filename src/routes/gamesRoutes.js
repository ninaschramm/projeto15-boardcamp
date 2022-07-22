import express from 'express';
import { getGames, registerGame } from '../controllers/gameControllers.js';

const gameRouter = express.Router();

gameRouter.get('/games', getGames)
gameRouter.post('/games', registerGame)

export default gameRouter;