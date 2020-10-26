console.log('Hello World')

const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const EmployeeRoute = require('./routes/employee')
const AuthRoute = require('./routes/auth')
mongoose.connect('mongodb+srv://hernri01:Capstone2020@cluster0.3ln2m.mongodb.net/test?authSource=admin&replicaSet=atlas-9q0n4l-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', {useNewUrlParser: true, useUnifiedTopology: true})
//mongoose.connect('mongodb+srv://yoda:maytheforce@cluster0.fvmkx.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Database Connection Established!')
//     const db = client.db('Users')
//     console.log('Created Users db')
//     const quotesCollection = db.collection('registeredUsers')
})

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('Server is running on port 3000')
})

app.use('/api/employee', EmployeeRoute)
app.use('/api', AuthRoute)

// Showing home page 
app.set("view engine", "ejs"); 
app.use(bodyParser.urlencoded({ extended: true })); 
  
app.use(require("express-session")({ 
    secret: "Rusty is a dog", 
    resave: false, 
    saveUninitialized: false
})); 

app.get("/", function (req, res) { 
    res.render("home"); 
}); 

app.get("/register", function (req, res) { 
    res.render("register"); 
}); 

app.get("/login", function (req, res) { 
    res.render("login"); 
}); 

app.get("/logout", function (req, res) { 
    res.render("home"); 
}); 

app.get("/index", function (req, res) { 
    res.render("index"); 
}); 
