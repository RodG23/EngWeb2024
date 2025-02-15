var express = require('express');
var router = express.Router();
var Compositor = require("../controllers/compositores")


/* GET users listing. */
router.get('/', function(req, res, next) {
  Compositor.list()
      .then(data => res.jsonp(data))
      .catch(e => res.jsonp(e))
});

router.get('/:id', function(req, res, next) {
  Compositor.listOne(req.params.id)
      .then(data => res.jsonp(data))
      .catch(e => res.jsonp(e))
});

router.post('/', function(req, res, next) {
  Compositor.insert(req.body)
  .then(data => res.jsonp(data))
  .catch(e => res.jsonp(e))
});

router.put('/:id', function(req, res, next) {
  Compositor.update(req.params.id, req.body)
  .then(data => res.jsonp(data))
  .catch(e => res.jsonp(e))
});

router.delete('/:id', function(req, res, next) {
  Compositor.remove(req.params.id)
  .then(data => res.jsonp(data))
  .catch(e => res.jsonp(e))
});

module.exports = router;