const Job = require('./job')
const Interview = require('./interview')
const Notification = require('./notification')
const Database = require('./database')

module.exports = class Employer {
    constructor(email) {
       this.email = email
       this.jobs = []
       this.inbox = []
       this.id = id()
       
       Database.save('employer.json', this)
    }
    // create a job, and add to jobs list
    createJobAd(title, description, zipcode, category, jobType, compensationMin, compensationMax, tips) {
        let job = new Job(title, description, zipcode, category, jobType, compensationMin, compensationMax, tips)
        job.employer = this
        // save job to db
        Database.save('job.json', job)
        // add job to employer
        this.jobs.push(job.id)
        Database.updateObject('employer.json', this.id, this)
        return job
    }
    // employer likes an application and wants to interview the candidate
    addInterview(application, option1, option2, option3) {
        // create an interview with optional times for the
        let interview = new Interview(application, option1, option2, option3)
        // add the interview to the employer's job ad
        application.job.interviews.push(interview.id)
        const jobId = application.job.id
        Database.updateObject('job.json', jobId, application.job)
        // add the interview to the job seeker's list
        application.jobSeeker.interviews.push(interview.id)
        const jobSeekerId = application.jobSeeker.id
        Database.updateObject('jobSeeker.json', jobSeekerId, application.jobSeeker)
        // add interview to application
        application.interview = interview.id
        Database.updateObject('application.json', application.id, application)

        return interview
    }
    //after interview the employer can update an application
    updateApplicationStatus(interview, status ){
        //if application status is accepted
        if (status === "accepted") {
            // send notification to job seeker that they have been hired and accept application
            const notification = new Notification('You have been hired! see your application here (eventually)', new Date(), interview.application.id)
            interview.jobSeeker.inbox.push(notification)
            Database.updateEntry('jobSeeker.json',interview.jobSeeker.id,'inbox', interview.jobSeeker.inbox)
            
            interview.application.status = status
            const applicationId = interview.application.id
            Database.updateEntry('application.json', applicationId, 'status', status)

            // decline all other applications for the job
            // we loop through all job applications except the current one
            let allApplicationIds = interview.job.applications
            let acceptedApplicationId = interview.application.id
            let notAcceptedApplicationIds = allApplicationIds.filter(function(applicationId) { return applicationId !== acceptedApplicationId});
            let applications = Database.load('application.json')

            notAcceptedApplicationIds.forEach(function(applicationId) {
                // edit db entry
                //update app status to declined
                Database.updateEntry('application.json', applicationId, 'status', 'declined')

                //send them some sort of notification
                const declineNotification = new Notification('This position has been filled. Thank you for your application.', new Date(), applicationId)
                const application = applications.find(application => application.id === applicationId)
                const jobSeekerId = application.jobSeeker.id
                application.jobSeeker.inbox.push(declineNotification)
                Database.updateObject('jobSeeker.json', jobSeekerId, application.jobSeeker)

            });

        } else {
            //define satus of the application ("maybe", "rejected")
            interview.application.status = status

            const applicationId = interview.application.id
            Database.updateObject('application.json', applicationId, interview.application)

        }
    }
}

function makeCounter() {
    var i = 0;
    return function() {
        return i++;
    }
}

var id = makeCounter();
