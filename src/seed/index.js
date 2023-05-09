/* eslint-disable no-console */
/* eslint-disable import/extensions */
import '../config/env.js';
import '../config/db.js';
import { Athlete, AthleteResults, Game } from '../models/mongo.js';
import seed from './seed.js';

const main = async () => {
  // populating seed for exercises and routines
  console.log('>> Populating seeds in DB');
  const athletes = await Athlete.insertMany(seed.athletes);
  const athleteResults = await AthleteResults.insertMany(seed.athleteResult);
  const olympicGames = await Game.insertMany(seed.games);
  console.log('>> Correctly populated seeds in DB');
};

main()
  .then(() => {
    console.log('>> Populated and corrected all seeds in DB');
    process.exit();
  })
  .catch((err) => {
    console.log('>> There was an error populating seeds in DB: ', err);
    process.exit(1);
  });
