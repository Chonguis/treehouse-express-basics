const express = require('express');
const router = express.Router();

const { data } = require('../data/flashcardData.json');
const { cards } = data;

router.get('/:id', (req, res) => {
  //Aquí voy a añadir const { side } = req.query; porque está buscando si en el query string
  //hay un 'side'.
  //También hay que encontrar el id const { id } = req.params;
  //Ahora unimos ambos: text = cards[id][side];
  //Guardamos una referencia del hint const { hint } = cards[id];
  //y envolvemos el text y hint en un objeto dispobinble al template const templateData = { text, hint }

  const { side } = req.query;
  const { id } = req.params;
  const text = cards[id][side];
  const { hint } = cards[id];
  const templateData = { text };

  console.log(templateData);

  if(side ==='question'){
    templateData.hint = hint;
  }

  res.render('card', templateData);

});

module.exports = router;
