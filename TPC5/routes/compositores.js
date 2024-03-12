var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET users listing. */
router.get('/', function(req, res, next) { //Aqui já está em /compositores
  axios.get("http://localhost:3000/compositores?_sort=nome")
  .then(resp =>{
      compositores = resp.data
      res.status(200).render("compositoresListPage", {'lCompositores' : compositores})
  })
  .catch(erro =>{
      res.status(501).render('error', {'error' : erro})
  })
})

router.get('/registo', function(req, res, next) {
  res.status(200).render("compositoresFormPage",)
})

router.post('/registo', function(req, res, next) {
  result = req.body
  axios.post("http://localhost:3000/compositores", result)
  .then(resp => {
      res.redirect("/")
  })
  .catch(erro => {
    res.status(502).render('error', {'error' : erro})
  })
})

router.get('/:idCompositor', function(req, res, next) {
  var id = req.params.idCompositor
  axios.get("http://localhost:3000/compositores/" +id)
  .then(resp =>{
      compositor = resp.data
      res.status(200).render("compositorPage", {'compositor' : compositor})
  })
  .catch(erro =>{
      res.status(503).render('error', {'error' : erro})
  })
})

router.get('/edit/:idCompositor', function(req, res, next) {
  var id = req.params.idCompositor
  axios.get("http://localhost:3000/compositores/" +id)
  .then(resp =>{
      compositor = resp.data
      res.status(200).render("compositorEditPage", {'compositor' : compositor})
  })
  .catch(erro =>{
      res.status(504).render('error', {'error' : erro})
  })
})

router.post('/edit/:idCompositor', function(req, res, next) {
  var compositor = req.body
  axios.put("http://localhost:3000/compositores/" + compositor.id, compositor)
  .then(resp =>{
      res.redirect("/")
  })
  .catch(erro =>{
      res.status(505).render('error', {'error' : erro})
  })
})

router.get('/delete/:idCompositor', function(req, res, next) {
  var id = req.params.idCompositor
  axios.delete("http://localhost:3000/compositores/" +id)
  .then(resp =>{
      res.redirect("/")
  })
  .catch(erro =>{
      res.status(506).render('error', {'error' : erro})
  })
})

module.exports = router;
