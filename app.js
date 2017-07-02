//añado express al proyecto
const express = require('express');
//añado handlebars al proyecto
const exphbs = require('express-handlebars');
//añado el body parser para poder leer form daya en el objeto request req.body
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//hago disponible el objeto de express en la variable app para extenderlo
const app = express();
//configuro que el app use el bodyParser para poder leer request.body
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
//esto es la configuración para que el view engine sea hbs y que el file sea el main que está
//en views
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const mainRoutes = require('./routes');
app.use(mainRoutes);

const cardRoutes = require('./routes/cards');
app.use('/cards', cardRoutes)

app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

//error middleware handler
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});
//Escuchando en el port 3000, servidor corriendo
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
