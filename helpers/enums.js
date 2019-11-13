const ApplicationStatuses = Object.freeze({
  Accepted: 'accepted',
  Pending: 'pending',
  Declined: 'declined',
  Started: 'started',
  Submitted: 'submitted',
});

const JobCategories = Object.freeze({
  Bar: 'bar',
  Floor: 'floor',
  Kitchen: 'kitchen',
  Management: 'management',
  Office: 'office',
  Other: 'other',
});

const JobTypes = Object.freeze({
  FullTime: 'full-time',
  PArtTime: 'part-time',
  Internship: 'internship',
  TempOrSeasonal: 'temporary/seasonal',
  Freelance: 'freelance',
});

module.exports = { ApplicationStatuses, JobCategories, JobTypes };
