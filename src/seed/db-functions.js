/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import { Athlete, Game } from '../models/mongo.js';
import seed from './seed.js';

export const cleanCollections = async () => {
  // reset the different collections in case there were there before
  await Athlete.collection.drop();
  // await AthleteResults.collection.drop();
  await Game.collection.drop();

  console.log('>> Collections cleaned in DB');
};

export const saveDocuments = async () => {
  console.log('>> Populating seeds in DB');
  const athletes = await Athlete.insertMany(seed.athletes);
  // const athleteResults = await AthleteResults.insertMany(seed.athleteResult);
  const olympicGames = await Game.insertMany(seed.games);

  return { athletes, olympicGames };
};
/* 
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
}; */

export const updateAthletes = async (athletes, olympicGames) => {
  await Promise.all(
    athletes.map(async (athlete) => {
      const dbGames = athlete._game_id.map((gameId) => {
        const relatedGame = olympicGames.find((game) => game._game_id === Number(gameId));

        if (relatedGame) {
          return relatedGame._id;
        }

        return [];
      });

      await athlete.updateOne({ games: dbGames });
    })
  );

  console.log('>> Updated Athletes');
};

export const updateGames = async (athletes, olympicGames) => {
  await Promise.all(
    olympicGames.map(async (game) => {
      const dbAthletes = game._athlete_id.map((athleteId) => {
        const relatedAthlete = athletes.find((athlete) => athlete._athlete_id === athleteId);

        if (relatedAthlete) {
          return relatedAthlete._id;
        }

        return [];
      });

      await game.updateOne({ athletes: dbAthletes });
    })
  );

  console.log('>> Updated Games');
};

export const cleanPrivateFields = async () => {
  /* await AthleteResults.updateMany(
    {},
    {
      $unset: {
        _athlete_id: 1,
        _game_id: 1
      }
    }
  ); */

  await Athlete.updateMany(
    {},
    {
      $unset: {
        _athlete_id: 1,
        _game_id: 1
      }
    }
  );

  await Game.updateMany(
    {},
    {
      $unset: {
        _game_id: 1,
        _athlete_id: 1
      }
    }
  );

  console.log('>> Deleted Private Fields');
};
