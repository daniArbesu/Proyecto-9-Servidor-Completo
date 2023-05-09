/* eslint-disable import/extensions */
import './config/env.js';
import './config/db.js';
import express from 'express';

const app = express();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server Running in port ${PORT}!`);
});
