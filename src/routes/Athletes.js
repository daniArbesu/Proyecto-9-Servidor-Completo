import express from 'express';
import {
  getAllAthletes,
  getAthleteById,
  getAthleteByIdAndPopulate,
  createAthlete,
  updateAthlete,
  deleteAthlete,
  updateGamesFromAthlete
} from '../controllers/athletes.js';
import authMiddleware from '../middlewares/auth.js';
import { upload } from '../middlewares/files.js';

const router = express.Router();

// We define the endpoints for the athletes collection
router.get('/', getAllAthletes);
router.get('/:id', getAthleteById);
router.get('/populate/:id', getAthleteByIdAndPopulate);
router.post('/', authMiddleware, upload.single('photo_url'), createAthlete);
router.put('/:id', authMiddleware, upload.single('photo_url'), updateAthlete);
router.put('/:id/update-games', authMiddleware, updateGamesFromAthlete);
router.delete('/:id', authMiddleware, deleteAthlete);

export default router;
