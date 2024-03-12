var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');
var fs = require('fs')

var pages = require('./pages')

function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

var compositoresServer = http.createServer((req, res) => {

    console.log(req.method + " " + req.url)

    switch(req.method){
        case "GET": 
            if(req.url=='/' || req.url=='/compositores'){
                axios.get("http://localhost:3000/compositores?_sort=nome")
                .then(resp =>{
                    compositores = resp.data
                    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                    res.write(pages.compositoresListPage(compositores))
                    res.end()
                })
                .catch(erro =>{
                    res.writeHead(503, {'Content-Type' : 'text/html; charset=utf-8'})
                    res.write("<p>Não foi possível obter a lista de compositores: " + erro + "</p>")
                    res.end()
                })
            }
            else if (req.url == '/w3.css'){
                fs.readFile("w3.css", (erro,dados) => {
                    res.writeHead(200, {'Content-Type' : 'text/css; charset=utf-8'})
                    res.write(dados)
                    res.end()
                })}
            else if(/\/compositores\/C\d+$/i.test(req.url)){
                id = req.url.split('/')[2]
                axios.get("http://localhost:3000/compositores/" + id)
                .then(resp =>{
                    compositor = resp.data
                    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                    res.write(pages.compositorPage(compositor))
                    res.end()
                })
                .catch(erro =>{
                    res.writeHead(504, {'Content-Type' : 'text/html; charset=utf-8'})
                    res.write("<p>Não foi possível obter a informação do compositor " +id + ': ' + erro + "</p>")
                    res.end()
                })
            }
            else if(req.url=='/compositores/registo'){
                res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                res.write(pages.compositoresFormPage())
                res.end()
            }
            else if(/\/compositores\/edit\/C\d+$/i.test(req.url)){
                id = req.url.split('/')[3]
                axios.get("http://localhost:3000/compositores/" + id)
                .then(resp =>{
                    compositor = resp.data
                    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                    res.write(pages.compositoresFormEditPage(compositor))
                    res.end()
                })
                .catch(erro =>{
                    res.writeHead(505, {'Content-Type' : 'text/html; charset=utf-8'})
                    res.write("<p>Não foi possível obter a informação do compositor " +id + ': ' + erro + "</p>")
                    res.end()
                })
            }
            else if(/\/compositores\/delete\/C\d+$/i.test(req.url)){
                id = req.url.split('/')[3]
                axios.delete("http://localhost:3000/compositores/" + id)
                .then(resp =>{
                    res.writeHead(201, {'Content-Type' : 'text/html; charset=utf-8'})
                    res.write("<p>Registo eliminado: " +id+ "</p>")
                    res.end()
                })
                .catch(erro =>{
                    res.writeHead(510, {'Content-Type' : 'text/html; charset=utf-8'})
                    res.write("<p>Não foi possível eliminar o composior " +id + ': ' + erro + "</p>")
                    res.end()
                })
            }
            else{
                res.writeHead(502, {'Content-Type' : 'text/html; charset=utf-8'})
                res.write("<p>GET request não suportado: " + req.url + "</p>")
                res.end()
            }
            break
        case "POST":
            if(req.url=='/compositores/registo'){
                collectRequestBodyData(req, result =>{
                    if(result){
                        console.log(result)
                        axios.post("http://localhost:3000/compositores", result)
                        .then(resp => {
                            res.writeHead(201, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write("<p>Registo inserido: " + JSON.stringify(resp.data) + "</p>")
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(508, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write(pages.errorPage("Não foi possível inserir o compositor"))
                            res.end()
                        })
                    }else{
                        res.writeHead(509, {'Content-Type' : 'text/html; charset=utf-8'})
                        res.write("<p>Não foi possível obter os dados do body</p>")
                        res.end()
                    }
                })
            }
            else if(/\/compositores\/edit\/C\d+$/i.test(req.url)){
                collectRequestBodyData(req, result =>{
                    if(result){
                        console.log(result)
                        axios.put("http://localhost:3000/compositores/" + result.id, result)
                        .then(resp => {
                            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write("<p>Registo alterado: " + JSON.stringify(resp.data) + "</p>")
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(507, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write(pages.errorPage("Não foi possível atualizar o compositor"))
                            res.end()
                        })
                    }else{
                        res.writeHead(506, {'Content-Type' : 'text/html; charset=utf-8'})
                        res.write("<p>Não foi possível obter os dados do body</p>")
                        res.end()
                    }
                })
            }
            else{
                res.writeHead(501, {'Content-Type' : 'text/html; charset=utf-8'})
                res.write("<p>POST request não suportado: " + req.url + "</p>")
                res.end()
            }
            break
        default: 
            res.writeHead(500, {'Content-Type' : 'text/html; charset=utf-8'})
            res.write("<p>Método não suportado: " + req.method + "</p>")
            res.end()
            break
    }
})

compositoresServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})

