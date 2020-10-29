const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
//Users
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

//Login Pages
router.get('/login', (req, res) => {
    res.render('login')
});

router.get('/playerlogin', (req, res) => {
    res.render('playerlogin')
});

//photo
router.get('/coachToolsLogo.png', (req, res) => {
    res.sendFile('coachToolsLogo.png', { root: '.' })
  });

//Register Page
router.get('/register', (req, res) => res.render('register'));

//coachHome page
router.get('/coachHome', (req, res) => {
    res.render('coachHome')
});

//coachHome page
router.get('/playerHome', (req, res) => {
    res.render('playerHome')
});

//player grades page
router.get('/grades', (req, res) => {
    res.render('grades')
});

//Register Handle
router.post('/register', (req, res) => {
    const { name, email, password, password2, userType } = req.body;
    let errors = [];
    //Check required fields
    if(!name || !email || !password || !password2 || !userType){
        errors.push({msg: 'Please fill in all fields'});
    }
    //Check passwords match
    if(password !== password2) {
        errors.push({ msg: 'Passwords do not match'});
    }
    //Check password Length
    if(password.length < 6) {
        errors.push({ msg: 'Password must be at least characters'});
    }

    if(errors.length > 0) {
        //req.flash('error', errors);
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else{
        //validation passed
        User.findOne({ email: email })
        .then(user => {
            if(user) {
                //User exists
                errors.push({ msg: 'Email is already in use.'});
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {
                //Add new user
                const newUser = new User({
                    name,
                    email,
                    password
                });

                //Hash Password
                bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        //set password to hashed
                        newUser.password = hash;
                        //save user
                        newUser.save()
                        .then(user => {
                            // if(userType.localCompare('coach')){
                            //     req.flash('success_msg', 'You are now registered and can log in');
                            //     res.redirect('/users/login');
                            // }else{
                                req.flash('success_msg', 'You are now registered and can log in');
                                res.redirect('/users/playerlogin');
                            // }
                        })
                        .catch(err => console.log(err));
                }))
            }
        });
    }
});

//Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/coachHome',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

router.post('/playerlogin', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/playerHome',
        failureRedirect: '/users/playerlogin',
        failureFlash: true
    })(req, res, next);
});

//logout handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

module.exports = router;