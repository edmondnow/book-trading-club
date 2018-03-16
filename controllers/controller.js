
var User = require('../models/user.js');
var Book = require('../models/book.js');
var Trade = require('../models/trade.js');

//please note that that there is no validation mechanism implemented
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter')


exports.index = function(req, res){
  if(req.session.userId){
    User.findById({_id: req.session.userId}).exec(function(err, userData){
      if(err) console.log(err)
          res.render('index', {title: 'goodBooks', session: true, username: userData.username, error: false});
    })
  } else {
    res.render('index', {title: 'goodBooks', session: false, error: false});
  }
}

exports.register = function(req, res){
  if(req.body.password !== req.body.passwordConf){
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.render('index', {title: 'goodBooks', session: false, error: {type: 'register', error: err}});
    return next(err);
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }
    //use schema.create to insert data into the db
    User.create(userData, function (err, user) {
      if (err) {
        return console.log(err);
      } else {
        req.session.userId = user._id;
        User.findById({_id: req.session.userId}).exec(function(err, userData){
          if(err) console.log(err)
              res.redirect('/')
        })
      }
    });
  }
}

exports.login = function(req, res){
 
  if (req.body.email &&
    req.body.password) {
    //use schema.create to insert data into the db
    User.authenticate(req.body.email, req.body.password, function(err, user){
      if(err || !user){
        var err = new Error('Wrong email or password');
        err.status = 401;
        res.render('index', {title: 'goodBooks', session: false, error: {type: 'login', error: err}});
      } else {
        req.session.userId = user._id;
        User.findById({_id: req.session.userId}).exec(function(err, userData){
          if(err) console.log(err)
          res.redirect('/')
          })
        }
      })
    }
  }


exports.logout = function(req, res){
 // GET /logout
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
}

exports.books_get = function(req, res){

}

exports.book_get = function(req, res){

}

exports.book_post = function(req, res){

}

exports.user_get = function(req, res){

}

exports.user_post = function(req, res){

}