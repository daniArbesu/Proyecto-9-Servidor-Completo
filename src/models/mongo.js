import mongoose from 'mongoose';

const emptySchema = new mongoose.Schema({});
/* const athleteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  dateOfBirth: String,
  bio: String,
  height: String,
  weight: String,
  photoURL: String
}); */

export const User = mongoose.model('User', emptySchema);
export const Athlete = mongoose.model('Athlete', emptySchema);
export const Game = mongoose.model('Game', emptySchema);
// export const AthleteResults = mongoose.model('AthleteResults', emptySchema);
