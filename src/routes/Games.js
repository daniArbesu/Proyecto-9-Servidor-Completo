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
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

// We define the endpoints for routines
router.get('/', getAllGames);
router.get('/:id', getGameById);
router.get('/populate/:id', getGameByIdAndPopulate);
router.post('/', authMiddleware, createGame);
router.put('/:id', authMiddleware, updateGame);
router.put('/:id/update-athletes', authMiddleware, updateAthletesFromGame);
router.delete('/:id', authMiddleware, deleteGame);

export default router;
