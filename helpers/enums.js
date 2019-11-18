const ApplicationStatus = {
  STARTED: 'started',
  SUBMITTED: 'submitted',
  INTERVIEW_OFFERED: 'interviewOffered',
  INTERVIEW_ACCEPTED: 'interviewAccepted',
  ACCEPTED: 'accepted',
  PENDING: 'pending',
  DECLINED: 'declined',
};

const JobCategory = {
  BAR: 'bar',
  FLOOR: 'floor',
  KITCHEN: 'kitchen',
  MANAGEMENT: 'management',
  OFFICE: 'office',
  OTHER: 'other',
};

const JobType = {
  FULL_TIME: 'full-time',
  PART_TIME: 'part-time',
  INTERNSHIP: 'internship',
  TEMP_OR_SEASONAL: 'temporary/seasonal',
  FREELANCE: 'freelance',
  OTHER: 'other',
};

module.exports = { ApplicationStatus, JobCategory, JobType };
