
:white_check_mark: install npm packages: express, nodemon, pug, body-parser, axios,

:white_check_mark: to use express:
    
    const express = require('express')
    const app = express()

    app.listen(3000, () => {
        console.log('did i work?')
    })

    app.get('/', (req, res) => {
        // res.send(`${__dirname}/views/index.pug`)
        // res.sendFile(`${__dirname}/index.html`)
        // to send multiple pug templates use the render function
        // res.render(`${__dirname}/views/index.pug`)
        res.render('index')
    })

:white_check_mark: make views folder
add pug index and details views for models
    
:white_check_mark:add `app.set('view engine', 'pug')` in order to be able to set express to use pug views.

:white_check_mark: connect http get requests for each route to display all  and individual model instances.

:white_check_mark: create a post request to add entries in db

:white_check_mark: create a put request to edit an entry in db

:white_check_mark: create a delete request to delete instances in the db


--> read on url query params

Sample axios requests
axios.get('http://localhost:3000/people/all')
axios.post('/employer', {email: "email 3...", id: 3}).then(console.log)axios.delete('/person/3').then((res => console.log(res.data)))
axios.put('/employer/5dc57b75c88a00e5aed4ac64', {email: "email 1..."}).then(console.log)
axios.delete('/employer/5dc5800d1bb3f7e77aee0246').then(console.log)


# Homework for week 4

1) :white_check_mark: Extend your NodeJS application by implemeting a web server using Express.js framework
2) Expose the capabilities of your application through URLs
    - :white_check_mark: basic CRUD functionality
    - special business logic
3) :white_check_mark: Make sure to add as many URLs as possible for creating / fetching / deleting resources
4) Add at least one URL which does a complex operation. Examples: Make a user attend a meetup, make a user comment on a movie
5) :white_check_mark: Add layout.pug file in your application under views folder
6) :white_check_mark: Display the data in the browser using pug files. Extend your pug templates from layout.pug.