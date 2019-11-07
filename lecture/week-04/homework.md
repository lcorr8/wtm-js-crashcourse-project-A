
install npm packages: express, nodemon, pug, body-parser, axios,

to use express:
    
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

make views folder
add pug index and details views for models
    
add `app.set('view engine', 'pug')` in order to be able to set express to use pug views.
write http get requests for each route to display all people, all posts, individual person, an individual post.

create a post request to add entries in db

create a put request to edit an entry in db

create a delete request to delete instances in the db


--> read on url query params

Sample axios requests
axios.get('http://localhost:3000/people/all')
axios.post('/person', {name: 'lola', age: '30'}).then(console.log)
axios.delete('/person/3').then((res => console.log(res.data)))
axios.post('/person/:id/follow', {targetId: 2}).then(res => console.log(res.data))