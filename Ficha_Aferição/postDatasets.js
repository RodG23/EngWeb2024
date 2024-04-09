var fs = require('fs')
var axios = require('axios')

fs.readFile('dataset-extra1.json', function(erro, dados) {
    dados.forEach(pessoa => {
        axios.post("http://localhost:3000/pessoas", pessoa)
    })
})

fs.readFile('dataset-extra2.json', function(erro, dados) {
    dados.forEach(pessoa => {
        axios.post("http://localhost:3000/pessoas", pessoa)
    })
})

fs.readFile('dataset-extra3.json', function(erro, dados) {
    dados.forEach(pessoa => {
        axios.post("http://localhost:3000/pessoas", pessoa)
    })
})