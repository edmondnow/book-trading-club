var express = require('express');
var router = express.Router();
var controller = require('../controllers/controller.js')

//Show landing page (all book that are available)
router.get('/', controller.index );

//Send register post request to twitter
router.get('/register', function(req, res, next) {
  res.send('not implemented yet');
});

//Send login post request to twitter
router.post('/login', function(req, res, next) {
  res.send('not implemented yet');
});

//Send logout post request to twitter
router.post('/logout', function(req, res, next) {
  res.send('not implemented yet');
});

//Show your book page
router.get('/books', function(req, res, next) {
  res.send('not implemented yet');
});

//Show your book page
router.get('/book', function(req, res, next) {
  res.send('not implemented yet');
});


//Post new book to page
router.post('/book', function(req, res, next) {
  res.send('not implemented yet');
});

//Send user information
router.get('/user', function(req, res, next) {
  res.send('not implemented yet');
});

//Save new user information
router.post('/user', function(req, res, next) {
  res.send('not implemented yet');
});


module.exports = router;
