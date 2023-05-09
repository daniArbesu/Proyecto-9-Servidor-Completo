/* eslint-disable no-console */
/* eslint-disable import/extensions */
import './config/env.js';
import './config/db.js';
import express from 'express';

const app = express();

app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: false }));

// Healthcheck para comprobar que la API está encendida
app.get('/ping', (req, res) => res.status(200).send('Pong'));

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server Running in port ${PORT}!`);
});
