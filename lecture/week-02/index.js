 const Person = require('./person')
 const Meetup = require('./meetup')
const Chalk = require('chalk');
const Database = require('./database')
 
console.log(Chalk.blue('Hello world!'));

armagan = new Person('Armagan', 35)
mert = new Person('Mert', 34)

armagan.greet(mert)

wtmb = new Meetup('Women Techmakers Berlin')
armagan.attend(wtmb)
mert.attend(wtmb)
wtmb.printAttendeeNames() 

Database.save('meetup.json', wtmb)
Database.save('person.json', mert)

const loadFile = Database.load('meetup.json')
 console.log(loadFile)