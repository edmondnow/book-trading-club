var express = require('express');
var router = express.Router();
var controller = require('../controllers/controller.js')


router.get('/', controller.index );

router.post('/register', controller.register );

router.post('/login', controller.login );

router.get('/logout', controller.logout );


router.get('/instance/:_id', controller.instance_get )

router.post('/instance', controller.instance_post )

router.get('/book', controller.book_get )

router.post('/book', controller.book_post )

router.get('/user', controller.user_get )

router.post('/user', controller.user_post )

router.post('/trading', controller.trading)


module.exports = router;
