var express = require('express');
var router = express.Router();
var controller = require('../controllers/controller.js')

//Show landing page (all book that are available)
router.get('/', controller.index );

//Send register post request to twitter
router.post('/register', controller.register );

//Send login post request to twitter
router.post('/login', controller.login );

//Send logout post request to twitter
router.get('/logout', controller.logout );

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
router.get('/user', controller.user_get )

//Save new user information
router.post('/user', controller.user_post )


module.exports = router;
