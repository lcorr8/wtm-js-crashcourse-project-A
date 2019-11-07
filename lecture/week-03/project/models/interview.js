
module.exports = class Interview {
  constructor(application, scheduleOptions) {
    this.job = application.job;
    this.application = application;
    this.jobSeeker = application.jobSeeker;
    this.scheduleOptions = scheduleOptions;
    this.finalInterviewSlot = null;
    this.id = id();
  }

  static create(application, scheduleOptions) {
    return new Interview(application, scheduleOptions);
  }
};

function makeCounter() {
  let i = 0;
  return function () {
    return i++;
  };
}

var id = makeCounter();
