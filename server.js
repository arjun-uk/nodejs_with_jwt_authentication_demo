const express = require('express');
const HELPERS = require('./src/helpers/api_helper');
const masterRoutes = require('./src/routes/master');
const authRoutes = require('./src/routes/auth');
const apiMiddleware = require('./src/middleware/api_middleware');


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



sequelize.sync({ alter: true }).then(() => {
    console.log("All models were synchronized successfully.");
}).catch((error) => {
    console.error("Error synchronizing models:", error);
});

sequelize.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Error: ' + err);
});





app.get('/', (req, res) => {
    HELPERS.successResponse(res, null,"Welcome to the API",0);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});