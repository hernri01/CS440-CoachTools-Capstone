const express = require('express')
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

//Welcome Page
router.get('/', (req, res) => res.render('welcome'));
//Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => 
    res.render('dashboard', {
        name: req.user.name
    }));

//Coach Home Page
router.get('/coachHome', ensureAuthenticated, (req, res) => 
    res.render('coachHome', {
        name: req.user.name //THis will pass the name that was entered in the Database
    }));

//Player Home Page
router.get('/playerHome', ensureAuthenticated, (req, res) => 
    res.render('playerHome', {
        name: req.user.name //This will pass the name that was entered in the Database
    }));

module.exports = router;