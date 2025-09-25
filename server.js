const express = require('express');
const HELPERS = require('./src/helpers/api_helper');
const masterRoutes = require('./src/routes/master');
const authRoutes = require('./src/routes/auth');
const apiMiddleware = require('./src/middleware/api_middleware');

const db = require('./src/model');
const logger = require('./src/utils/logger');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = 3000;
app.use(express.json());


global.HELPERS = HELPERS;
app.use(cors());
app.use('/api', apiMiddleware);
app.use('/api/masters',masterRoutes);
app.use('/api/auth', authRoutes);

logger.info('Server starting...');
logger.warn('This is a warning message');
logger.error('This is an error message');

const stream = {
  write: (message) => logger.info(message.trim()),
};

const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development'; // Skip logging in production
};

app.use(morgan('combined', { stream, skip }));

db.sequelize.sync({ alter: true })
  .then(() => {
    logger.info('Database synced successfully');
  })
  .catch(err => {
    logger.error('Error syncing database: ' + err.message);
  });
app.get('/', (req, res) => {
    HELPERS.successResponse(res, null,"Welcome to the API",0);
});

// Start server
app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});