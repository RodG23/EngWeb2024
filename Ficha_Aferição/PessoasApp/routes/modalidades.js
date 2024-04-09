var express = require('express');
var router = express.Router();
var Pessoa = require("../controllers/pessoas")

/* GET users listing. */
router.get('/', function(req, res, next) {
  Pessoa.listModalidades()
    .then(data => res.jsonp(data))
    .catch(e => res.jsonp(e))
});

router.get('/:modalidade', function(req, res, next) {
    Pessoa.listModalidade(req.params.modalidade)
      .then(data => res.jsonp(data))
      .catch(e => res.jsonp(e))
  })

module.exports = router;