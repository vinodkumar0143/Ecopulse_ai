const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const buildingRoutes = require('./routes/buildingRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/auth');
const aiRoutes = require('./routes/ai');
const predictRoutes = require('./routes/predict');
const gameRoutes = require('./routes/game');

const app = express();

// Global Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Route Hit Debugger Middleware
app.use((req, res, next) => {
  console.log(`[API Route Hit] ${req.method} ${req.url}`);
  next();
});

// Base Route
app.get('/', (req, res) => {
  res.json({ message: 'API Running Successfully' });
});

// Mount API Routes (Supporting both /api/users and /api/auth)
app.use('/api/buildings', buildingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/predict', predictRoutes);
app.use('/api/game', gameRoutes);

// Custom Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
