/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
// Mongo DB
import mongoose from 'mongoose';

mongoose.set('strict', false);
mongoose.set('strictQuery', false);
mongoose.set('strictPopulate', false);

const USERNAME = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = 'olympic-games-db';

mongoose
  .connect(
    `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.kotv9qb.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('>> Connected to DB!');
  })
  .catch((err) => {
    console.log('Error connecting to DB', err);
    process.exit(1);
  });
