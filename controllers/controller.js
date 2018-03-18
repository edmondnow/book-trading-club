
var User = require('../models/user.js');
var Book = require('../models/book.js');
var Trade = require('../models/trade.js');
var async = require('async');

//please note that that there is no validation mechanism implemented
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter')


exports.index = function(req, res){

  if(req.session.userId){
    Book.find({}).exec(function(err, bookData){
      nonUserBooks = [];
      bookData.forEach(function(book){
        if(book.owner!=req.session.userId){
          nonUserBooks.push(book)
        }
      })
      User.findById({_id: req.session.userId}).populate('books').exec(function(err, userData){
      if(err) console.log(err)
          res.render('index', {title: 'goodBooks', session: true, username: userData.username, books: nonUserBooks, error: false});
      })
    })
  } else {
    Book.find({}).exec(function(err, bookData){
    res.render('index', {title: 'goodBooks', books: bookData, session: false, error: false});
    })
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

exports.book_post = function(req, res){

  var book = new Book({
    author: req.body.author,
    title: req.body.title,
    cover: req.body.cover,
    owner: req.session.userId
  })


  book.save( function(err, book){
    if(err) console.log(err)
     User.findByIdAndUpdate({_id: req.session.userId}, {$push:{books: book._id}}, {new: true}).populate('books').exec(function(err, userData){
        if(err) console.log(err)
        res.render('book', {title: 'goodBooks', session: true, username: userData.username, books: userData.books, msg: 'Book was saved successfully',  error: false});
    })
  })
}

exports.book_get = function(req, res){
  Trade.find({}).populate('owner requester offer wanted').exec(function( err, tradeData){
    var requests = [];
    var offers = [];
    tradeData.forEach(function(trade){
      if(trade.requester._id == req.session.userId){
       requests.push(trade);
      };
      if(trade.owner._id == req.session.userId){
        offers.push(trade);
      }
    });
    User.findById({_id: req.session.userId}).populate('books').exec(function(err, userData){
        if(err) console.log(err)
        var resObj = {title: 'goodBooks', session: true, username: userData.username, error: false}
        if(requests.length>0){
          resObj.requests = requests;
        }
        if(offers.length>0){
          resObj.offers = offers;
        }
        if(userData.books.length>0){
          resObj.books = userData.books
        }
        res.render('book', resObj);
    })
  })
}

exports.instance_get = function(req, res){
  Book.findById({_id: req.params._id}).populate('owner').exec(function(err, bookData){
    if(err) console.log(err)
      User.findById({_id: req.session.userId}).populate('books').exec(function(err, userData){
      if(err) console.log(err);
        var resObj =  {title: 'goodBooks', session: true, username: userData.username, tradeBook: bookData, error: false};
        if(userData.books.length>0){
          resObj.userBooks = userData.books
        } 
        res.render('instance', resObj);
         
    })
  })
}

exports.instance_post = function(req, res){
  var trade = new Trade({
    requester: req.session.userId,
    owner: req.body.tradebookownerid,
    offer: req.body.offerid,
    wanted: req.body.tradebookid,
    status: 'Pending'
    })
  trade.save( function(err, data){
    if(err) console.log(err)
    res.redirect('/book')
  })
}

exports.user_get = function(req, res){
    if(req.session.userId){
    User.findById({_id: req.session.userId}).exec(function(err, userData){
      if(err) console.log(err)
          res.render('user', {title: 'goodBooks', session: true, username: userData.username, name: userData.name, state: userData.state, city: userData.city,  error: false});
    })
    } else {
      res.redirect('/');
    }
}

exports.user_post = function(req, res){
    if(req.session.userId){
    User.findByIdAndUpdate(req.session.userId, {name: req.body.name, state: req.body.state, city: req.body.city}, {new: true}).exec(function(err, userData){
      if(err) console.log(err)
      console.log(userData)
      res.render('user', {title: 'goodBooks', session: true, username: userData.username, name: userData.name, state: userData.state, city: userData.city, msg: 'Your user data was updated.',  error: false});
    })
    } else {
      res.redirect('/');
    }
}


exports.trading = function(req, res){
  if(req.body.decision == 'accept'){
    async.parallel([
      Trade.findByIdAndUpdate(req.body.offerid, {status: 'Accepted'}, function(err){
        if(err) console.log(err)
      }),
      Book.findByIdAndUpdate(req.body.wantedid, {owner: req.body.requesterid}, function(err){
        if(err) console.log(err)
      }),
      Book.findByIdAndUpdate(req.body.offeredid, {owner: req.session.userId}, function(err){
        if(err) console.log(err)
      }),
      User.findByIdAndUpdate(req.session.userId, {$pull: {books: req.body.wantedid}}, function(err){
        if(err) console.log(err)
      }),
      User.findByIdAndUpdate(req.session.userId, {$push: {books: req.body.offeredid}}, function(err){
        if(err) console.log(err)
      }),
      User.findByIdAndUpdate(req.body.requesterid, {$pull: {books: req.body.offeredid}}, function(err){
        if(err) console.log(err)
      }),
      User.findByIdAndUpdate(req.body.requesterid, {$push: {books: req.body.wantedid}}, function(err){
        if(err) console.log(err)
      })
      ], function(err, results){
        console.log(err);
        res.redirect('/book')
      }
    )

  } else if (req.body.decision == 'decline' ){
      Trade.findByIdAndUpdate(req.body.offerid, {status: 'Declined'}).exec(function(err, returned){
        res.redirect('/book')
      })
  }
}