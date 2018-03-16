var express = require('express');
var router = express.Router();
var controller = require('../controllers/controller.js')


router.get('/', controller.index );

router.post('/register', controller.register );

router.post('/login', controller.login );

router.get('/logout', controller.logout );

router.get('/books', function(req, res, next) {
  res.send('not implemented yet');
});

router.get('/book', controller.book_get )

router.post('/book', controller.book_post )

router.get('/user', controller.user_get )

router.post('/user', controller.user_post )


module.exports = router;
