const express = require('express');
const router = express.Router();

//va a estar escuchando a los que vayan al route / para responderle con hello world usando
//el objeto response. Las personas que hagan get requests a / van a ser respondidos.
router.get('/', function (req, res) {
  if(req.cookies.username){
    res.render('home', { name: req.cookies.username });
  } else {
    res.redirect('hello');
  }
});
router.get('/hello', function (req, res) {
  if(req.cookies.username){
    res.redirect('/');
  } else {
    res.render('hello');
  }
});
//Los post requests, en este caso hecho desde route hello, es activado en el submit del form-group.
//Si tiene la propiedad de name atrapada en el objeto de request, el template va a cambiar.
router.post('/hello', function (req, res) {
  res.cookie('username', req.body.username);
  res.redirect('/');
});
router.post('/goodbye', (req, res) => {
  res.clearCookie('username');
  res.redirect('hello');
});

module.exports = router;
