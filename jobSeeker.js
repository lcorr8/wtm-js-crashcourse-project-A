const Application = require('./application')
const Database = require('./database')

module.exports = class JobSeeker {
    constructor(name, email) {
        this.name = name
        this.email = email
        this.applications = []
        this.resumes = []
        this.interviews = []
        this.inbox = []
        this.id = id()

        Database.save('jobSeeker.json', this)
    }
    
    // job seeker can apply to a job
    apply(job, yearsOfExperience, languagesSpoken, otherSkills, interviewAvailability) {
        //create application to the job
        var application = new Application(job, yearsOfExperience, languagesSpoken, otherSkills, interviewAvailability)
        // add jobseeker to the application
        application.jobSeeker = this
        // add application to the job seekers applications list
        this.applications.push(application.id)
        Database.updateObject('jobSeeker.json', this.id, this)
        // add aplication to jobs list of applications
        job.applications.push(application.id)
        Database.updateObject('job.json', job.id, job)
        // save application to db
        Database.save('application.json', application)
        return application
    }

    // TODO: mmm...add image/pdf of a resume fuctionality to his profile perhaps?
    addResume() {
    }   
    
    //job seeker accepts an interview time
    acceptInterview(interview, option){
        //update the final interview time of the interview
        interview.finalInterviewSlot = option
        Database.updateEntry('interview.json', interview.id, 'finalInterviewSlot', option )
    }
        
}

function makeCounter() {
    var i = 0;
    return function() {
        return i++;
    }
}

var id = makeCounter();
