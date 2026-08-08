const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const buildingRoutes = require('./routes/buildingRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/auth');

const app = express();

// Global Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Base Route
app.get('/', (req, res) => {
  res.json({ message: 'API Running Successfully' });
});

// Mount API Routes
app.use('/api/buildings', buildingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Custom Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
