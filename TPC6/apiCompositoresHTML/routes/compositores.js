var express = require('express');
var router = express.Router();
var Compositor = require("../controllers/compositores")


/* GET users listing. */
router.get('/', function(req, res, next) {
  Compositor.list()
      .then(data => res.status(200).render("compositoresListPage", {'lCompositores' : data}))
      .catch(erro => res.status(501).render('error', {'error' : erro}))
})

router.get('/registo', function(req, res, next) {
  res.status(200).render("compositoresFormPage",)
})

router.post('/registo', function(req, res, next) {
  Compositor.insert(req.body)
  .then(data => res.redirect("/compositores"))
  .catch(erro => res.status(502).render('error', {'error' : erro}))
})

router.get('/edit/:id', function(req, res, next) {
  Compositor.listOne(req.params.id)
      .then(data => res.status(200).render("compositorEditPage", {'compositor' : data}))
      .catch(erro => res.status(504).render('error', {'error' : erro}))
})

router.post('/edit/:id', function(req, res, next) {
  Compositor.update(req.params.id, req.body)
  .then(data => res.redirect("/compositores"))
  .catch(erro => res.status(505).render('error', {'error' : erro}))
})

router.get('/delete/:id', function(req, res, next) {
  Compositor.remove(req.params.id)
  .then(data => res.redirect("/compositores"))
  .catch(erro => res.status(506).render('error', {'error' : erro}))
})

router.get('/:id', function(req, res, next) {
  Compositor.listOne(req.params.id)
      .then(data => res.status(200).render("compositorPage", {'compositor' : data}))
      .catch(erro => res.status(503).render('error', {'error' : erro}))
})

module.exports = router;