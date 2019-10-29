const Database = require('./database');

module.exports = class Interview {
  constructor(application, scheduleOptions) {
    this.job = application.job;
    this.application = application;
    this.jobSeeker = application.jobSeeker;
    this.scheduleOptions = scheduleOptions;
    this.finalInterviewSlot = null;
    this.id = id();

    Database.save('interview.json', this);
  }
};

function makeCounter() {
  let i = 0;
  return function () {
    return i++;
  };
}

var id = makeCounter();
