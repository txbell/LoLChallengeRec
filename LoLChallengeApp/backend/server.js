require('dotenv').config()
const express = require('express');
const path = require('path')


/* Require the db connection, models, and seed data
--------------------------------------------------------------- */
const db = require('./models');


/* Require the routes in the controllers folder
--------------------------------------------------------------- */
const usersCtrl = require('./controllers/users')


/* Create the Express app
--------------------------------------------------------------- */
const app = express();


/* Middleware (app.use)
--------------------------------------------------------------- */
// body parser - used for POST/PUT/PATCH routes:
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


/* Mount routes
--------------------------------------------------------------- */
// This tells our app to look at the `controllers/comments.js` file 
// to handle all routes that begin with `localhost:3000/api/applications`
app.use('/api/users', usersCtrl)

// When a GET request is sent to `/seed`, the products collection is seeded
app.get('/seed', function (req, res) {
    console.log(db.seedChallenges)
    // Remove any existing products
    db.Challenge.deleteMany({})
        .then(removedProducts => {
            console.log(`Removed ${removedProducts} products`)

            // Seed the products collection with the seed data
            db.Challenge.insertMany(db.seedChallenges)
                .then(addedProducts => {
                    console.log(`Added ${addedProducts.length} products to be adopted`)
                    res.json(addedProducts)
                })
        })
});

app.get('/api/challenge/:challengeId', function (req, res) {
    db.Challenge.find({ id: req.params.challengeId })
        .then(challenge => res.json(challenge))
})

/* Tell the app to listen on the specified port
--------------------------------------------------------------- */
app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});