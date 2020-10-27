console.log('May Node be with you');

const MongoClient = require('mongodb').MongoClient
const express = require('express');
const uri = "mongodb+srv://hernri01:Capstone2020@cluster0.3ln2m.mongodb.net/test?authSource=admin&replicaSet=atlas-9q0n4l-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true&useUnifiedTopology=true";
const bodyParser= require('body-parser'); //Parses the CVS (excel) file.
const app = express();
var fileUpload = require('express-fileupload'); //Upload files. 
var mongoose = require('mongoose'); //This is for MongoDB Schemas.
var Roster = require('./roster.js'); //This is the Roster schema that will be used in the code. 
const csv = require('fast-csv');


//This is for uploading the files. It is necessary for parsing and getting data.
const multer = require('multer');
const upload = multer({
    dest: 'uploads/' // this saves your file into a directory called "uploads"
  }); 
  

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
    
    app.use(fileUpload()); //Will use the npm package to upload a file.
    
    //This will connect to the database so that things can be added.
    mongoose.connect('mongodb+srv://hernri01:Capstone2020@cluster0.3ln2m.mongodb.net/test?authSource=admin&replicaSet=atlas-9q0n4l-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true&useUnifiedTopology=true&useNewUrlParser=true');

    //This is the template that will be used for Coaches to get a template of how we want the excel file to be formatted. 
    var template = require('./template.js'); 
    app.get('/template', template.get);
    
    
    //This will upload a file to the Database and redirect to the same page. 
    app.post('/upload', (req,res) => 
    {
        if (!req.files)
           return res.status(400).send('No files were uploaded.');
        
        var rosterFile = req.files.file;

        var players = [];
            
        csv.parseString(rosterFile.data.toString(), {
            headers: true,
            ignoreEmpty: true
        })
        .on("data", function(data){
            data['_id'] = new mongoose.Types.ObjectId();
            
            players.push(data);
        })
        .on("end", function(){
            Roster.create(players, function(err, documents) {
                if (err) throw err;
            });
                    // Sorting by the position Alhpabetically.
            res.redirect('/'); //Redirecting to the home page, but can be changed to whatever. 
        });
        
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
})

.catch(console.error)
