"use strict";

const express = require('express'); // const region = require('../routes/region');
// const user = require('../routes/user');


const auth = require('../controllers/auth'); // const ingest = require('../routes/ingest');
// const error = require('../middleware/error');
// const site = require('../routes/site');
// const bot = require('../routes/bots');


module.exports = app => {
  app.use(express.json()); //   app.use('/api/region', region);
  //   app.use('/api/user', user);
  //   app.use('/api/sites', site);
  //   app.use('/api/bots', bot);

  app.use('/api/auth', auth); //   app.use('/api/ingest', ingest);
  // app.use(error);
};