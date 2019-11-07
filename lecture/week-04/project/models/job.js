module.exports = class Job {
  // eslint-disable-next-line max-len
  constructor(title, description, zipcode, category, jobType, compensationMin, compensationMax, tips, employer) {
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
    this.employer = employer;
    this.id = id();
  }

  static create(
    title, description, zipcode, category, jobType,
    compensationMin, compensationMax, tips, employer,
  ) {
    return new Job(
      title, description, zipcode, category, jobType,
      compensationMin, compensationMax, tips, employer,
    );
  }
};

function makeCounter() {
  let i = 0;
  return function () {
    return i++;
  };
}

const id = makeCounter();
