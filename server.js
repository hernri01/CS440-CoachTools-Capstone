console.log('May Node be with you');

const MongoClient = require('mongodb').MongoClient
const express = require('express');
const uri = "mongodb+srv://hernri01:Capstone2020@cluster0.3ln2m.mongodb.net/test?authSource=admin&replicaSet=atlas-9q0n4l-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true&useUnifiedTopology=true";
const bodyParser= require('body-parser');
const app = express();

// Make sure that the bodyparser comes before the GET and POST functions.
MongoClient.connect(uri, { useUnifiedTopology: true })
.then(client => {
    const db = client.db('test');
    const quotesCollection = db.collection('quotes');
    const rosterCollection = db.collection('Roster');


    app.set('view engine', 'ejs')
    app.use(express.static('public'))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    // Will create a browser that the computer can connect to. 
    app.listen(3000, function() {
        console.log('listening on 3000')
    })

    // Reading something. Getting information 
    app.get('/', (req, res) => //This is the same as function(req,res)
    {
        // Sorting by the position Alhpabetically.
        db.collection('Roster').find({ "Pos": { "$exists": true } }).sort({'Pos': 1}).toArray()
        .then(results => {
            res.render('index.ejs', {players: results})
        })
        .catch(error => console.error(error))

    })

    app.get('/home.html', (req, res) => 
    {
        res.sendFile('D:/RicardoCrudTutorial/home.html')
    })

    app.get('/coachHome.html', (req, res) => 
    {
        res.sendFile('D:/RicardoCrudTutorial/coachHome.html')
    })

    app.get('/playerHome.html', (req, res) => 
    {
        res.sendFile('D:/RicardoCrudTutorial/playerHome.html')
    })

    app.get('/player.html', (req, res) => 
    {
        res.sendFile('D:/RicardoCrudTutorial/player.html')
    })

    app.get('/login.html', (req, res) => 
    {
        res.sendFile('D:/RicardoCrudTutorial/login.html')
    })

    app.get('/coach.html', (req, res) => 
    {
        res.sendFile('D:/RicardoCrudTutorial/coach.html')
    })

    app.get('/coachToolsLogo.png', (req, res) => 
    {
        res.sendFile('D:/RicardoCrudTutorial/views/coachToolsLogo.png')
    })

    app.post('/table', (req,res) => 
    {
        const type = req.body.type;

        if(type == "wr")
        {
            rosterCollection.find( {"Pos" : "WR"}).toArray()
            .then(results => {
                res.render('index.ejs', {players: results})
                res.redirect('/');
            })
            .catch(error => console.error(error))
        }
        else if(type == "qb")
        {
            rosterCollection.find( {"Pos" : "QB"}).toArray()
            .then(results => {
                res.render('index.ejs', {players: results})
                res.redirect('/');
            })
            .catch(error => console.error(error))
        }
        else if(type == 'k')
        {
            rosterCollection.find( {"Pos" : "K"}).toArray()
            .then(results => {
                res.render('index.ejs', {players: results})
                res.redirect('/');
            })
            .catch(error => console.error(error))
        }
        else if(type == 'lb')
        {
            rosterCollection.find( {"Pos" : "LB"}).toArray()
            .then(results => {
                res.render('index.ejs', {players: results})
                res.redirect('/');
            })
            .catch(error => console.error(error))
        }
        else if( type == 'gy')
        {
            rosterCollection.find({ "GradYear": { "$exists": true } }).sort({'GradYear': 1}).toArray()
            .then(results => {
                res.render('index.ejs', {players: results})
                res.redirect('/');
            })
            .catch(error => console.error(error))
        }
        else if(type == 'gyd')
        {
            rosterCollection.find({ "GradYear": { "$exists": true } }).sort({'GradYear': -1}).toArray()
            .then(results => {
                res.render('index.ejs', {players: results})
                res.redirect('/');
            })
            .catch(error => console.error(error))
        }
        else
        {
            db.collection('Roster').find({ "Pos": { "$exists": true } }).sort({'Pos': 1}).toArray()
            .then(results => {
                res.render('index.ejs', {players: results})
                res.redirect('/');
            })
            .catch(error => console.error(error))
        }
        console.log(req.body)
    })
    //Adding a player
    app.post('/players', (req, res) => {
        const gYear = parseInt(req.body.GradYear) 
        console.log(gYear)
        rosterCollection.insert({
            FirstName : req.body.FirstName,
            LastName : req.body.LastName,
            GradYear : gYear,
            Pos : req.body.Pos
        })
        .then(result => {
            res.redirect('/');
        })
        .catch(error => console.error(error))
    })


    // This method will update the roster of a specific player by typing it in. Eventually we want to update the table by possibly clicking on the table and changing it from there.
    app.post('/update', (req, res) => {
        const fName = req.body.FirstName;
        const lName = req.body.LastName;
        const pos = req.body.Pos;
        
        console.log(req.body)
        console.log(fName)
        console.log(pos)
        rosterCollection.findOneAndUpdate(
            {"LastName" : lName},       //{ "FirstName" : fName }, 
            { $set: { "Pos" : pos } }
         )
        .then(result => {
            res.redirect('/');
        })
        .catch(error => console.error(error))
    })

    app.put('/quotes', (req, res) => {
        // console.log(req.body)

        quotesCollection.findOneAndUpdate(
            { name: 'Yoda' },
            {
              $set: {
                name: req.body.name,
                quote: req.body.quote
              }
            },
            {
              upsert: true
            }
        )
        .then(result => {
            res.json('Success')
        })
        .catch(error => console.error(error))

    })

    // Deleting a quote. Specifically from Darth Vader
    app.delete('/quotes', (req, res) => {
        // Handle delete event here
        quotesCollection.deleteOne(
            { name: req.body.name },
          )
          .then(result => {
            if (result.deletedCount === 0) {
                return res.json('No quote to delete')
            }
            res.json(`Deleted Darth Vadar's quote`)
          })
          .catch(error => console.error(error))
      })
})

.catch(console.error)