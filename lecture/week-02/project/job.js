module.exports = class Job {
  // eslint-disable-next-line max-len
  constructor(title, description, zipcode, category, jobType, compensationMin, compensationMax, tips) {
    this.title = title;
    this.description = description;
    this.zipcode = zipcode;
    this.category = category;
    this.jobType = jobType;
    this.compensationMin = compensationMin;
    this.compensationMax = compensationMax;
    this.tips = tips;
    this.applications = [];
    this.interviews = [];
    this.employer = null;
    this.id = id();
  }
};

function makeCounter() {
  let i = 0;
  return function () {
    return i++;
  };
}

const id = makeCounter();
