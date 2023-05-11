import express from 'express';
import {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
  getGameByIdAndPopulate,
  updateAthletesFromGame
} from '../controllers/games.js';

const router = express.Router();

// We define the endpoints for routines
router.get('/', getAllGames);
router.get('/:id', getGameById);
router.get('/populate/:id', getGameByIdAndPopulate);
router.post('/', createGame);
router.put('/:id', updateGame);
router.put('/:id/update-athletes', updateAthletesFromGame);
router.delete('/:id', deleteGame);

export default router;
