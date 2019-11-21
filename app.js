/* eslint-disable no-console */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios').default;
const cors = require('cors');

const EmployerRoutes = require('./routes/employer');
const NotificationRoutes = require('./routes/notification');
const ApplicationRoutes = require('./routes/application');
const InterviewRoutes = require('./routes/interview');
const JobRoutes = require('./routes/job');
const JobSeekerRoutes = require('./routes/job-seeker');

require('./database-connection');

app.use(cors());
app.set('view engine', 'pug');
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index');
});

// registering basic CRUD routes for all models
app.use('/employer', EmployerRoutes);
app.use('/notification', NotificationRoutes);
app.use('/application', ApplicationRoutes);
app.use('/interview', InterviewRoutes);
app.use('/job', JobRoutes);
app.use('/job-seeker', JobSeekerRoutes);

module.exports = app;
