module.exports = class Employer {
  constructor(email) {
    this.email = email;
    this.jobs = [];
    this.inbox = [];
    this.id = id();
  }

  static create(email) {
    return new Employer(email);
  }
};

function makeCounter() {
  let i = 0;
  return function () {
    return i++;
  };
}

const id = makeCounter();
