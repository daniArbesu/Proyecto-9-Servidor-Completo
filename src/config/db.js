/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
// Mongo DB
import mongoose from 'mongoose';

const MONGO_PORT = 27018;
const MONGO_DB = 'fitness';

mongoose.set('strict', false);
mongoose.set('strictQuery', false);
mongoose.set('strictPopulate', false);

const USERNAME = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = 'money-exchange-db';

mongoose
  .connect(`mongodb://localhost:${MONGO_PORT}/${MONGO_DB}`)
  /*   .connect(
    `mongodb+srv://${USERNAME}:${PASSWORD}@rockthemongo.kkf4buu.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
  ) */
  .then(() => {
    console.log('>> Connected to DB!');
  })
  .catch((err) => {
    console.log('Error connecting to DB', err);
    process.exit(1);
  });
