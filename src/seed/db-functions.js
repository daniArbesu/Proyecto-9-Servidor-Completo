/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import { Athlete, AthleteResults, Game } from '../models/mongo.js';
import seed from './seed.js';

export const cleanCollections = async () => {
  // reset the different collections in case there were there before
  await Athlete.collection.drop();
  await AthleteResults.collection.drop();
  await Game.collection.drop();

  console.log('>> Collections cleaned in DB');
};

export const saveDocuments = async () => {
  console.log('>> Populating seeds in DB');
  const athletes = await Athlete.insertMany(seed.athletes);
  const athleteResults = await AthleteResults.insertMany(seed.athleteResult);
  const olympicGames = await Game.insertMany(seed.games);

  return { athletes, athleteResults, olympicGames };
};

export const updateResults = async (athletes, athleteResults, olympicGames) => {
  await Promise.all(
    athleteResults.map(async (result) => {
      const dbAthletes = athletes.find((athlete) => athlete._athlete_id === result._athlete_id);
      await result.updateOne({ athlete_id: dbAthletes._id });
    })
  );

  await Promise.all(
    athleteResults.map(async (result) => {
      const dbGames = olympicGames.find((game) => game._game_id === result._game_id);
      await result.updateOne({ game_id: dbGames._id });
    })
  );
  console.log('>> Updated AthleteResults');
};

/* export const updateAthletes = async (athletes, athleteResults) => {
  await Promise.all(
    athletes.map(async (athlete) => {
      const dbResults = athlete._game_id.find(
        (athlete) => athlete._athlete_id === result._athlete_id
      );
      await result.updateOne({ athlete_id: dbRoutine._id });
    })
  );

  console.log('>> Updated Athletes');
}; */

export const cleanPrivateFields = async () => {
  await AthleteResults.updateMany(
    {},
    {
      $unset: {
        _athlete_id: 1,
        _game_id: 1
      }
    }
  );

  await Athlete.updateMany(
    {},
    {
      $unset: {
        _athlete_id: 1
      }
    }
  );

  await Game.updateMany(
    {},
    {
      $unset: {
        _game_id: 1
      }
    }
  );

  console.log('>> Deleted Private Fields');
};
