const BaseService = require('./base-service');
const ApplicationModel = require('../models/application');
const Enums = require('../helpers/enums');
class ApplicationService extends BaseService {
  model = ApplicationModel;

  async startApplication(jobseeker,job, applicationParams) {
    applicationParams.job = job
    applicationParams.jobSeeker = jobseeker
    applicationParams.status = Enums.ApplicationStatuses.Started
    const application = await this.add(applicationParams);

    jobseeker.applications.push(application);
    await jobseeker.save()
    return application
  }
}

module.exports = new ApplicationService();
