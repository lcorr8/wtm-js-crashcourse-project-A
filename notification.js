const Database = require('./database')

module.exports = class Notification {
    constructor(message, time, applicationId) {
        this.message = message
        this.time = time
        this.applicationId = applicationId
        this.opened = false
        this.id = id()

        Database.save('notification.json', this)

    }
}

function makeCounter() {
    var i = 0;

    return function (){
        return i++;
    }
}

var id = makeCounter();
