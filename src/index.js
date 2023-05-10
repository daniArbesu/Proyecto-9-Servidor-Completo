/* eslint-disable no-console */
/* eslint-disable import/extensions */
import './config/env.js';
import './config/db.js';
import express from 'express';
import cors from 'cors';
import publicRouter from './routes/index.js';
import authRouter from './routes/auth.js';

const app = express();

// Using CORS middleware to restrict website access
app.use(
  cors({
    origin: (urlOrigin, callback) => {
      // Allowing all IPs right now
      callback(null, true);
    }
  })
);

app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: false }));

// Inject routers to add the functionality
app.use('/api', publicRouter);
app.use('/auth', authRouter);

// Handle Client Side Errors
app.use('*', (req, res) => {
  res.status(401).json({ data: 'Not found' });
});

// Handle Server Errors
app.use((error, req, res) => {
  res.status(500).json({ data: 'Internal Server Error' });
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server Running in port ${PORT}!`);
});
