const express = require('express');
const HELPERS = require('./src/helpers/api_helper');
const masterRoutes = require('./src/routes/master');
const authRoutes = require('./src/routes/auth');
const apiMiddleware = require('./src/middleware/api_middleware');

const db = require('./src/model');

const sequelize = require('./src/database/index')
const cors = require('cors');

const app = express();
const PORT = 3000;
app.use(express.json());


global.HELPERS = HELPERS;
app.use(cors());
app.use('/api', apiMiddleware);
app.use('/api/masters',masterRoutes);
app.use('/api/auth', authRoutes);

db.sequelize.sync({ alter: true })
  .then(() => console.log('✅ Database updated automatically'))
  .catch(err => console.error('❌ Database sync error:', err));
app.get('/', (req, res) => {
    HELPERS.successResponse(res, null,"Welcome to the API",0);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});