/* eslint-disable import/extensions */
import express from 'express';
import athletesrouter from './Athletes.js';
import routinesRouter from './Games.js';

export const router = express.Router();

router.use('/athletes', athletesrouter);
router.use('/routines', routinesRouter);

export default router;
