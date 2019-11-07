
module.exports = class Notification {
  constructor(message, time, applicationId) {
    this.message = message;
    this.time = time;
    this.applicationId = applicationId;
    this.opened = false;
    this.id = id();
  }

  static create(message, time, applicationId) {
    return new Notification(message, time, applicationId);
  }
};

function makeCounter() {
  let i = 0;

  return function () {
    return i++;
  };
}

let id = makeCounter();
