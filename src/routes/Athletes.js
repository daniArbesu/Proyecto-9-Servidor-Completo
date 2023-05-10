import express from 'express';
import {
  getAllAthletes,
  getAthleteById,
  getAthleteByIdAndPopulate,
  createExercise,
  updateExercise,
  deleteExercise,
  updateRoutineFromExercise
} from '../controllers/athletes.js';

const router = express.Router();

// We define the endpoints for the athletes collection
router.get('/', getAllAthletes);
router.get('/:id', getAthleteById);
router.get('/populate/:id', getAthleteByIdAndPopulate);
router.post('/', createExercise);
router.put('/:id', updateExercise);
router.put('/:id/update-routine', updateRoutineFromExercise);
router.delete('/:id', deleteExercise);

export default router;
