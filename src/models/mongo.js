import mongoose from 'mongoose';

const emptySchema = new mongoose.Schema({});
const athleteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  date_of_birth: String,
  bio: String,
  height: String,
  weight: String,
  photo_url: String,
  games: [{ type: mongoose.Types.ObjectId, ref: 'Game' }]
});

const gameSchema = new mongoose.Schema({
  city: { type: String, required: true },
  year: { type: Number, required: true },
  athletes: [{ type: mongoose.Types.ObjectId, ref: 'Athlete' }]
});

export const User = mongoose.model('User', emptySchema);
export const Athlete = mongoose.model('Athlete', athleteSchema);
export const Game = mongoose.model('Game', gameSchema);
// export const AthleteResults = mongoose.model('AthleteResults', emptySchema);
