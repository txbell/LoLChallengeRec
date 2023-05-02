/* 
---------------------------------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with `localhost:3000/users`
---------------------------------------------------------------------------------------
*/


/* Require modules
--------------------------------------------------------------- */
const jwt = require('jwt-simple')
const express = require('express')
// Router allows us to handle routing outisde of server.js
const router = express.Router()


/* Require the db connection, and models
--------------------------------------------------------------- */
const db = require('../models')

/* Require the JWT config
--------------------------------------------------------------- */
const config = require('../../jwt.config.js')

/* Routes
--------------------------------------------------------------- */
// Index Route (GET/Read): Will display all users
router.get('/', function (req, res) {
    db.User.find()
        .then(users => {
            for (user in users) {
                console.log(users[user].id)
            }
            res.json(users)
        })
})

// Index Route (GET/Read): Will display all users
router.get('/:userId', function (req, res) {
    db.User.find({ userId: req.params.userId })
        .then(users => res.json(users))
})

// Create Route (POST/Create): This route receives the POST request sent from the new route,
// creates a new user document using the form data, 
// and redirects the user to the new user's show page
router.post('/', (req, res) => {
    db.User.create(req.body)
        .then(user => res.json(user))
})

// SIGN UP REOUTE (CREATE USER)
router.post('/signup', (req, res) => {
    console.log('signing up')
    console.log(req.body)
    db.User.create(req.body)
        .then(user => {
            console.log(user)
            const token = jwt.encode({ id: user.id }, config.jwtSecret)
            console.log(token)
            res.json({ token: token })
        })
        .catch(() => {
            res.sendStatus(401)
            console.log('error 401')
        })
})

// LOG IN (log into a user account)
router.post('/login', async (req, res) => {
    console.log('logging in')
    // attempt to find the user by their email in the database
    const foundUser = await db.User.findOne({ email: req.body.email })
    // check to:
    // 1. make sure the user was found in the database
    // 2. make sure the user entered in the correct password
    if (foundUser && foundUser.password === req.body.password) {
        // if the above applies, send the JWT to the browser
        const payload = { id: foundUser.id }
        const token = jwt.encode(payload, config.jwtSecret)
        console.log("token " + token)
        console.log("payload " + payload)
        console.log("foundUser " + foundUser)
        res.json({
            token: token,
            email: foundUser.email,
            id: foundUser.id
        })
        console.log('User sucessfully logged in!')
        // if the user was not found in the database OR their password was incorrect, send an error
    } else {
        res.sendStatus(401)
    }
})


// Show Route (GET/Read): Will display an individual user document
// using the URL parameter (which is the document _id)
router.get('/:email', function (req, res) {
    console.log(req.params.email)
    db.User.find({ email: req.params.email })
        .then(user => {
            console.log(user)
            res.json(user)
        })
})

// Update Route (PUT/Update): This route receives the PUT request sent from the edit route, 
// edits the specified user document using the form data,
// and redirects the user back to the show page for the updated location.
router.put('/:id', (req, res) => {
    console.log(req.body)
    console.log(req.params.id)
    db.User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(user => res.json(user))
})

// Destroy Route (DELETE/Delete): This route deletes a user document 
// using the URL parameter (which will always be the user document's ID)
router.delete('/:id', (req, res) => {
    console.log('deleting user')
    db.User.findByIdAndRemove(req.params.id)
        .then(() => res.redirect(`/`))
})


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router