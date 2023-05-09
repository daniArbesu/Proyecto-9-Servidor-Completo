/* eslint-disable import/extensions */
import './config/env.js';
import './config/db.js';
import express from 'express';

const app = express();

app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server Running in port ${PORT}!`);
});
