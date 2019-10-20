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

    addInterview(application, option1, option2, option3) {
        // create an interview with optional times for the
        let interview = new Interview(application, option1, option2, option3)
        // add the interview to the employer's job ad
        application.job.interviews.push(interview)
        // add the interview to the job seeker's list
        application.jobSeeker.interviews.push(interview)
    }

    updateApplicationStatus(interview, status ){
        //if application status is accepted
        if (status === "accepted") {
            // send notification to job seeker that they have been hired
            // decline all other applications for the job
                //we loop through all job applications except the current one
                //update their status to declined
                //send them some sort of notification
        } else {
            //define satus of the application
            interview.application.status = status
            console.log(interview.application.status)
        }
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
    // when an application is accepted, send notification
    // to all other applications that the position has been filled
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
    }
    // job seeker can apply to a job
    apply(job, yearsOfExperience, languagesSpoken, otherSkills, interviewAvailability) {
        //create application to the job
        var application = new Application(job, yearsOfExperience, languagesSpoken, otherSkills, interviewAvailability)
        application.jobSeeker = this
        // add application to the job seekers applications list
        this.applications.push(application)
        // add aplication to jobs list of applications
        job.applications.push(application)
    }

    addResume() {
        //mmm...add image/pdf of a resume fuctionality to his profile perhaps?
    }   
    
    //accept an interview time
    acceptInterview(interview, option){
        //update the final interview time of the interview
        interview.finalInterviewSlot = option
        console.log("----------HERE-----------")
        console.log(interview.finalInterviewSlot)
    }
        
}

Application = class {
    // extend application to also receive a resume
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

js1 = new JobSeeker("Tom", "test@email.com")
js1.apply(job1, 4, "English and Spanish", "Social media skills", "weekdays 9-11 am, and any time on weekends")
// console.log("both employer job and seeker account for the application")
// console.log(js1.applications[0])
// console.log(em1.jobs[0].applications[0])
ap1 = em1.jobs[0].applications[0]

// employer likes an application and offers an interview
em1.addInterview(ap1, "Oct 28 2019, 9am", "Oct 29 2019, 9am", "Oct 30 2019, 9am")
in1 = em1.jobs[0].interviews[0]

js1.acceptInterview(in1, in1.option2)

//in the interview employer can update application status to hire, think about some more, decline.
em1.updateApplicationStatus(in1, "declined")


