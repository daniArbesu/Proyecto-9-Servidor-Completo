/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import '../config/env.js';
import '../config/db.js';
import {
  cleanCollections,
  cleanPrivateFields,
  saveDocuments,
  updateAthletes,
  updateGames
} from './db-functions.js';

const main = async () => {
  // reset the different collections in case there were there before
  await cleanCollections();
  // populating seed
  const { athletes, olympicGames } = await saveDocuments();
  await updateAthletes(athletes, olympicGames);
  await updateGames(athletes, olympicGames);
  await cleanPrivateFields();
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
