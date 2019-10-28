module.exports =class Application {
    // TODO: extend application to also receive a resume at some point
     constructor(job, yearsOfExperience, languagesSpoken, otherSkills, interviewAvailability, jobSeeker) {
        this.job = job 
        this.jobSeeker = jobSeeker
        this.yearsOfExperience = yearsOfExperience
        this.languagesSpoken = languagesSpoken
        this.otherSkills = otherSkills
        this.interviewAvailability = interviewAvailability
        this.status = null
        this.interview = null
        this.id = id()
     }
     
}
// TODO: abstract id functionality into a helper function?
function makeCounter() {
    var i = 0;
    return function() {
        return i++;
    }
}

var id = makeCounter();
