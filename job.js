module.exports = class Job {
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
        this.employer = null
        this.id = id()
    }
}

function makeCounter() {
    var i = 0;
    return function() {
        return i++;
    }
}

var id = makeCounter();
