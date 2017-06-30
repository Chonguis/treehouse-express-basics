//añado express al proyecto
const express = require('express');
//añado handlebars al proyecto
const exphbs = require('express-handlebars');
//añado el body parser para poder leer form daya en el objeto request req.body
const bodyParser = require('body-parser');
//hago disponible el objeto de express en la variable app para extenderlo
const app = express();

//configuro que el app use el bodyParser para poder leer request.body
app.use(bodyParser.urlencoded({extended: false}));

//esto es la configuración para que el view engine sea hbs y que el file sea el main que está
//en views
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
//va a estar escuchando a los que vayan al route / para responderle con hello world usando
//el objeto response. Las personas que hagan get requests a / van a ser respondidos.
app.get('/', function (req, res) {
  res.render('home', {status: 'Success!'})
})

app.get('/hello', function (req, res) {
  res.render('hello')
})

//Los post requests, en este caso hecho desde route hello, es activado en el submit del form-group.
//Si tiene la propiedad de name atrapada en el objeto de request, el template va a cambiar.
app.post('/hello', function (req, res) {
  res.render('hello', {name: req.body.username})
})

//Escuchando en el port 3000, servidor corriendo
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
