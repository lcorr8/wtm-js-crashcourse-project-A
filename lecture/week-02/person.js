const Chalk = require('chalk');

module.exports = class Person {
    constructor(name, age) {
       this.name = name
       this.age = age
    }
    greet(person) {
        console.log(Chalk.white.green.bold('Hello ' + person.name, 'my name is', this.name))
    }
    attend(meetup) {
        // use name to brak the circular error when saving to db
        this.meetup = meetup.name
        meetup.attendees.push(this)
    }
 }

 printName = person => console.log(Chalk.magenta(person.name))
