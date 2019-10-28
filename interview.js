Database = require('./database')

module.exports = class Interview {
    constructor(application, option1, option2, option3){
        this.job = application.job
        this.application = application
        this.jobSeeker = application.jobSeeker
        this.option1 = option1
        this.option2 = option2
        this.option3 = option3
        this.finalInterviewSlot = null
        this.id = id()

        Database.save('interview.json', this)
    }
}

function makeCounter() {
    var i = 0;
    return function() {
        return i++;
    }
}

var id = makeCounter();
