var http = require('http')
var fs = require('fs')
var url = require('url')
var axios = require('axios')

function geraIndex(index){
    var indexHTML = `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Página Principal</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                }
                h3 {
                    color: #607D8B;
                }
                ul {
                    list-style-type: none;
                    padding: 0;
                }
                li {
                    margin-bottom: 10px;
                }
                h5 {
                    color: #607D8B;
                }
            </style>
        </head>
        <body>
            <div>
                <h3>Cidades</h3>
                <ul>
    `            
    
    index.forEach(city => {
        indexHTML += `
        <li>
        <a href="/${city.id}">${city.nome}</a>
        </li>
        `
    });
    
    indexHTML += `</ul>
                <h5>Generated by CityApp::EngWeb2024::A100555</h5>
            </div>
        </body>
        </html>
    `

    return indexHTML
}

http.createServer((req, res) => {
    var path = url.parse(req.url).pathname;
    var regex = /\/c\d{1,3}/

    console.log(req.method + ' ' + req.url)

    if (path == '/'){
        axios.get("http://localhost:3000/cidades?_sort=nome")
        .then(resp => {
            res.writeHead(200, {'Contnt-Type' : 'text/html; charset=utf-8'})
            res.write(geraIndex(resp.data))
            res.end()
        })
        .catch(erro => {
            res.writeHead(500, {'Contnt-Type' : 'text/html; charset=utf-8'})
            res.write("<p> Ocorreu um erro: " + erro + "</p>")
            res.end()
        })
    } else if (regex.test(path)){
        fs.readFile('cidades' + path + '.html', (erro, dados) => {
            res.writeHead(200, {'Contnt-Type' : 'text/html; charset=utf-8'})
            res.write(dados)
            res.end()
        })
    }else if (path == '/w3.css'){
        fs.readFile("w3.css", (erro,dados) => {
            res.writeHead(200, {'Contnt-Type' : 'text/css; charset=utf-8'})
            res.write(dados)
            res.end()
        })
    }else{
        res.writeHead(400, {'Contnt-Type' : 'text/html; charset=utf-8'})
        res.write('<p> Erro: Pedido não suportado </p>')
        res.write('<pre>' + req.url +'</pre>')
        res.end()
    }
}).listen(7777);