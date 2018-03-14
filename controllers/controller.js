
var User = require('../models/user.js');
var Book = require('../models/book.js');
var Trade = require('../models/trade.js');

//please note that that there is no validation mechanism implemented
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter')


exports.index = function(req, res){
res.render('index', {title: 'TradeX'});
}

exports.login = function(req, res){

}

exports.logout = function(req, res){
  
}

exports.register = function(req, res){
  
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