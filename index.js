Employer = class {
    constructor(email) {
       this.email = email
       this.jobs = []
    }
    // create a job, and add to jobs list
    createJobAd(title, description, zipcode, category, jobType, compensationMin, compensationMax, tips) {
        let job = new Job(title, description, zipcode, category, jobType, compensationMin, compensationMax, tips)
        this.jobs.push(job)
    }
    // employer likes an application and wants to interview the candidate
    addInterview(application, option1, option2, option3) {
        // create an interview with optional times for the
        let interview = new Interview(application, option1, option2, option3)
        // add the interview to the employer's job ad
        application.job.interviews.push(interview)
        // add the interview to the job seeker's list
        application.jobSeeker.interviews.push(interview)
    }
    //after interview the employer can update an application
    updateApplicationStatus(interview, status ){
        //if application status is accepted
        if (status === "accepted") {
            // send notification to job seeker that they have been hired
            var notification = new Notification('You have been hired! see your application here (eventually)', new Date(), interview.application)
            interview.jobSeeker.inbox.push(notification)
            // decline all other applications for the job
            // we loop through all job applications except the current one
            var allApplications = interview.job.applications
            var acceptedApplication = interview.application
            var notAcceptedApplications = allApplications.filter(function(application) { return application !== acceptedApplication});
            
            notAcceptedApplications.forEach(function(application) {
                //update their status to declined
                application.status = "declined"
                //send them some sort of notification
                var declineNotification = new Notification('This position has been filled. Thank you for your application.', new Date(), application)
                application.jobSeeker.inbox.push(declineNotification)
            });

        } else {
            //define satus of the application ("maybe", "rejected")
            interview.application.status = status
        }
    }
}

Notification = class {
    constructor(message, time, application) {
        this.message = message
        this.time = time
        this.application = application
        this.opened = false
    }
}

Job = class {
    constructor(title, description, zipcode, category, jobType, compensationMin, compensationMax, tips) {
        this.title = title
        this.description = description
        this.zipcode = zipcode
        this.category = category
        this.jobType = jobType
        this.compensationMin = compensationMin
        this.compensationMax = compensationMax
        this.tips = tips
        this.applications = []
        this.interviews = []
    }
}

Interview = class {
     constructor(application, option1, option2, option3){
         this.job = application.job
         this.application = application
         this.jobSeeker = application.jobSeeker
         this.option1 = option1
         this.option2 = option2
         this.option3 = option3
         this.finalInterviewSlot = null
     }
}

JobSeeker = class {
    constructor(name, email) {
        this.name = name
        this.email = email
        this.applications = []
        this.resumes = []
        this.interviews = []
        this.inbox = []
    }
    // job seeker can apply to a job
    apply(job, yearsOfExperience, languagesSpoken, otherSkills, interviewAvailability) {
        //create application to the job
        var application = new Application(job, yearsOfExperience, languagesSpoken, otherSkills, interviewAvailability)
        // add jobseeker to the application
        application.jobSeeker = this
        // add application to the job seekers applications list
        this.applications.push(application)
        // add aplication to jobs list of applications
        job.applications.push(application)
    }

    addResume() {
        //mmm...add image/pdf of a resume fuctionality to his profile perhaps?
    }   
    
    //job seeker accepts an interview time
    acceptInterview(interview, option){
        //update the final interview time of the interview
        interview.finalInterviewSlot = option
    }
        
}

Application = class {
    // extend application to also receive a resume at some point
     constructor(job, yearsOfExperience, languagesSpoken, otherSkills, interviewAvailability, jobSeeker) {
        this.job = job 
        this.jobSeeker = jobSeeker
        this.yearsOfExperience = yearsOfExperience
        this.languagesSpoken = languagesSpoken
        this.otherSkills = otherSkills
        this.interviewAvailability = interviewAvailability
        this.status = null
     }
}


// seed data
em1 = new Employer("employer1@email.com")
em1.createJobAd("Waiter wanted", "Waiter to work in a cafe", "10117", "floor", "full time", 12, 12, true)
job1 = em1.jobs[0]

js1 = new JobSeeker("Tom", "tom@email.com")
js1.apply(job1, 4, "English and Spanish", "Social media skills", "weekdays 9-11 am, and any time on weekends")
// console.log("both employer job and seeker account for the application")
// console.log(js1.applications[0])
// console.log(em1.jobs[0].applications[0])
ap1 = em1.jobs[0].applications[0]

js2 = new JobSeeker("Thalia", "thalia@email.com")
js2.apply(job1, 10, "German, English and French", "Kitchen management skills", "anytime")
ap2 = em1.jobs[0].applications[1]

js3 = new JobSeeker("Tintin", "tintin@email.com")
js3.apply(job1, 2, "German, English", "bar license", "anytime")
ap3 = em1.jobs[0].applications[2]

// employer likes an application and offers an interview
em1.addInterview(ap1, "Oct 28 2019, 9am", "Oct 29 2019, 9am", "Oct 30 2019, 9am")
in1 = em1.jobs[0].interviews[0]

em1.addInterview(ap2, "Oct 28 2019, 10am", "Oct 29 2019, 10am", "Oct 30 2019, 10am")
in2 = em1.jobs[0].interviews[1]

em1.addInterview(ap3, "Oct 28 2019, 11am", "Oct 29 2019, 11am", "Oct 30 2019, 11am")
in3 = em1.jobs[0].interviews[2]

// job seeker accepts an interview slot
js1.acceptInterview(in1, in1.option2)

js2.acceptInterview(in2, in2.option1)

js3.acceptInterview(in3, in3.option3)

//in the interview employer can update application status to hire, maybe (think about it some more), decline.
em1.updateApplicationStatus(in1, "declined")
em1.updateApplicationStatus(in2, "maybe")
em1.updateApplicationStatus(in3, "accepted")

// verify first applicant gets rejection notification
console.log(js1.inbox[0])

