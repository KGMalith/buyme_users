let express = require('express');
let router = express.Router();

//Import Schemas
require('../models/index');


//Import Routing files
let authRoutes = require('./auth_routes');

//Define Routing paths
router.use('/', authRoutes);

module.exports = router;