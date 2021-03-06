/**
 * ===========================================================================
 * File: session.js 
 * Author: Antonio Faienza
 * This file manages the session, in particular: 
 * - login
 * - logout
 * ===========================================================================
 */

 var express = require('express');
 const router = express.Router();
 const mongoose = require('mongoose');

 const Users = mongoose.model('Users');

/**
 * Define Login
 */
 router.get('/login', function (req, res, next) {
     /**
      * Define the default account if the number of user is 0
      */
    Users.countDocuments(function(err,count){
        if(err){
            return res.status(500).send({
                insertionError: true,
                errors: err.message,
                statusCode: 500
                });
        }else{             
            /**
             * For the first access or if all user are delete we add a default user
             * user: root
             * pass: root
             * mail: root@root.it
             */
            if(count==0){
                Users.create({ username: 'root', email:'root@root.com', password:'root'}, function (err, user) {
                    if (err) {
                        return res.status(422).send({
                            insertionError: true,
                            errors: err,
                            statusCode: 11000
                        });            
                    } else {
                        /**
                         * inizialize the messageFlash..
                         * In this case, if you need to be redirected to the login page,
                         * you will see the messageFlashDanger or messageFlashSuccess
                         */
                        res.render('login', {title: "SM - Login", messageFlashDanger: req.flash('danger') });
                    }            
                });
            }else {
                res.render('login', {title: "SM - Login", messageFlashDanger: req.flash('danger') });
            }
        }        
    });
});


router.post('/login', function(req,res,next){
    console.log(req.body);
    if(req.body.email && req.body.password){
        Users.authenticate(req.body.email, req.body.password, function (error, user){
            if(error || !user){
                req.flash('danger', error.message)
                res.redirect('/login');
            }else {
                req.session.userId = user._id;
                return res.redirect('/')
            }
        })
    }else {       
        req.flash('danger', 'All fields required.')
        res.redirect('/login');
    }
})

/**
 * Define Logout
 */
router.post('/logout', function(req, res,next){
    console.log(req.session)
    if(req.session){
        //delete session object
        req.session.destroy(function(err){
            if(err){
                return res.status(400).send({
                    insertionError: true,
                    errors: err.message,
                    statusCode: 400
                    });
            }else {                
                return res.redirect('/login');
            }
        });
    }
});


module.exports = router;