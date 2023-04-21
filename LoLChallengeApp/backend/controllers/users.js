/* 
---------------------------------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with `localhost:3000/api/users`
---------------------------------------------------------------------------------------
*/


/* Require modules
--------------------------------------------------------------- */
const express = require('express')
// Router allows us to handle routing outisde of server.js
const router = express.Router()


/* Require the db connection, and models
--------------------------------------------------------------- */
const db = require('../models')


/* Routes
--------------------------------------------------------------- */
// Index Route (GET/Read): Will display all users
router.get('/:userId', function (req, res) {
    db.User.find({ artworkId: req.params.artworkId })
        .then(users => res.json(users))
})

// Create Route (POST/Create): This route receives the POST request sent from the new route,
// creates a new user document using the form data, 
// and redirects the user to the new user's show page
router.post('/', (req, res) => {
    db.User.create(req.body)
        .then(user => res.json(user))
})

// Show Route (GET/Read): Will display an individual user document
// using the URL parameter (which is the document _id)
router.get('/:id', function (req, res) {
    db.User.findById(req.params.id)
        .then(user => res.json(user))
})

// Update Route (PUT/Update): This route receives the PUT request sent from the edit route, 
// edits the specified user document using the form data,
// and redirects the user back to the show page for the updated location.
router.put('/:id', (req, res) => {
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
    db.User.findByIdAndRemove(req.params.id)
        .then(() => res.send('You deleted user ' + req.params.id))
})


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router