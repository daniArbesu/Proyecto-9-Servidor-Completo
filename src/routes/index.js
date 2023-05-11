/* eslint-disable import/extensions */
import express from 'express';
import athletesrouter from './Athletes.js';
import gamesRouter from './Games.js';

export const router = express.Router();

router.use('/athletes', athletesrouter);
router.use('/games', gamesRouter);

export default router;
