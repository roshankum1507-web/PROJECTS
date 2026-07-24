const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const jobApplicationRoutes = require('./routes/jobApplicationRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

const allowedOrigins = [process.env.CLIENT_URL].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      try {
        const parsedOrigin = new URL(origin);
        const isLocalDevHost = parsedOrigin.hostname === 'localhost' || parsedOrigin.hostname === '127.0.0.1';

        if (isLocalDevHost) {
          return callback(null, true);
        }
      } catch (error) {
        // fall through to the rejection below
      }

      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/applications', jobApplicationRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
