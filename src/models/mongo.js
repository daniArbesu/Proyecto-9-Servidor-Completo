import mongoose from 'mongoose';

const emptySchema = new mongoose.Schema({});

export const User = mongoose.model('User', emptySchema);
export const Athlete = mongoose.model('Athlete', emptySchema);
export const Game = mongoose.model('Game', emptySchema);
export const AthleteResults = mongoose.model('AthleteResults', emptySchema);
