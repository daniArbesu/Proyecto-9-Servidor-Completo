/* eslint-disable no-console */
/* eslint-disable import/extensions */
import './config/env.js';
import './config/db.js';
import './config/cloudinary.js';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import publicRouter from './routes/index.js';
import authRouter from './routes/auth.js';

// Defining rate-limit for the API
const limiter = rateLimit({
  windowMs: 3 * 60 * 1000, // 3 minutes
  max: 50, // Limit each IP to 100 requests per 'window' (here, per 3 minutes)
  standardHeaders: true, // Return rate limit info in the 'RateLimit-*' headers
  legacyHeaders: false // Disable the 'X-RateLimit-*' headers
});

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

// Apply the rate limiting middleware to all requests
app.use(limiter);

// To allow serializing in json without external library 'extended: false'
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: false }));

// Def. Routes
app.use('/api', publicRouter);
app.use('/auth', authRouter);

// Routes not found (Client Side Errors)
app.use('*', (req, res) => {
  res.status(401).json({ data: 'Not found' });
});

// Handle Server Errors
app.use((error, req, res) => {
  res.status(500).json({ data: 'Internal Server Error' });
});

// Disable for security reasons the stack used to develope the API
app.disable('x-powered-by');

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server Running on htttp://localhost:${PORT}`);
});
