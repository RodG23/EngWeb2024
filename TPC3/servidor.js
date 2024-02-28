var http = require('http')
var fs = require('fs')
var axios = require('axios')
var url = require('url')

http.createServer((req,res) => {
    console.log(req.method + ' ' + req.url)
    var q = url.parse(req.url).pathname
    var regex_filmes = /\/filmes\/(f\d{1,5})/

    if(q == '/'){
        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
        res.write('<h1> Página Inicial </h1>')
        res.end()
    }else if (q == '/filmes'){
        axios.get("http://localhost:3000/ocorrencias")
        .then(resp => {
            res.writeHead(200, {'Contnt-Type' : 'text/json; charset=utf-8'})
            res.write(JSON.stringify(resp.data))
            res.end()
        })
        .catch(erro =>{
            res.writeHead(500, {'Contnt-Type' : 'text/html; charset=utf-8'})
            res.write("<p> Ocorreu um erro: " + erro + "</p>")
            res.end()
        })
    }else if (test = regex_filmes.exec(q)){
        axios.get("http://localhost:3000/ocorrencias?_id=" + test[1])
        .then(resp =>{
            res.writeHead(200, {'Contnt-Type' : 'text/json; charset=utf-8'})
            res.write(JSON.stringify(resp.data))
            res.end()
        })
        .catch(erro =>{
            res.writeHead(500, {'Contnt-Type' : 'text/html; charset=utf-8'})
            res.write("<p> Ocorreu um erro: " + erro + "</p>")
            res.end()
        })
    }else{
        res.writeHead(400, {'Contnt-Type' : 'text/html; charset=utf-8'})
        res.write('<p> Erro: Pedido não suportado </p>')
        res.write('<pre>' + req.url +'</pre>')
        res.end()
    }
}).listen(7777)