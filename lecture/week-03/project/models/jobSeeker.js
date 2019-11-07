module.exports = class JobSeeker {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.applications = [];
    this.resumes = [];
    this.interviews = [];
    this.inbox = [];
    this.id = id();
  }

  static create(name, email) {
    return new JobSeeker(name, email);
  }
};

function makeCounter() {
  let i = 0;
  return function () {
    return i++;
  };
}

const id = makeCounter();
