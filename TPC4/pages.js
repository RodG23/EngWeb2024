exports.compositoresListPage = function(clist, d){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Compositores</title>
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-teal">
                    <h1>Lista de compositores
                    <a class="w3-btn w3-round w3-grey" href="/compositores/registo">+</a>
                    </h1>
                    
                </header>
        
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th><th>Nome</th>
                            <th>Actions</th>
                        </tr>
                `
    for(let i=0; i < clist.length ; i++){
        pagHTML += `
                <tr>
                    <td>${clist[i].id}</td>
                    <td>
                        <a href="/compositores/${clist[i].id}">
                            ${clist[i].nome}
                        </a>
                    </td>
                    <td>
                        [<a href="/compositores/edit/${clist[i].id}">Edit</a>] 
                        [<a href="/compositores/delete/${clist[i].id}">Delete</a>]
                    </td>
                </tr>
        `
    }

    pagHTML += `
            </table>
            </div>
                <footer class="w3-container w3-blue">
                    <h5>Generated by CompositoresApp</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}


exports.compositoresFormPage = function(){
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="../w3.css"/>
            <title>Student Form</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h2>Formulário Compositor</h2>
                </header>
            
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Dados</legend>
                        <label>Id</label>
                        <input class="w3-input w3-round" type="text" name="id" required/>
                        <label>Nome</label>
                        <input class="w3-input w3-round" type="text" name="nome" required/>
                        <label>Bio</label>
                        <input class="w3-input w3-round" type="text" name="bio"/>
                        <label>Data Nascimento</label>
                        <input class="w3-input w3-round" type="text" name="dataNasc" required/>
                        <label>Data Óbito</label>
                        <input class="w3-input w3-round" type="text" name="dataObito" required/>
                        <label>Período</label>
                        <input class="w3-input w3-round" type="text" name="periodo"/>
                    </fieldset>
                    <br/>
                    <button class="w3-btn w3-purple w3-mb-2" type="submit">Register</button>
                </form>

                <footer class="w3-container w3-purple">
                    <h5>Generated by CompositoresApp - [<a href="/">Return</a>]</h5>
                </footer>
            
            </div>
    `
}

exports.compositoresFormEditPage = function(c){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="../../w3.css"/>
            <title>Formulário Compositor</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h2>Formulário Compositor</h2>
                </header>
            
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Metadata</legend>
                        <label>Id</label>
                        <input class="w3-input w3-round" type="text" name="id" readonly value="${c.id}"/>
                        <label>Nome</label>
                        <input class="w3-input w3-round" type="text" name="nome" value="${c.nome}"/>
                        <label>Bio</label>
                        <input class="w3-input w3-round" type="text" name="bio" value="${c.bio}"/>
                        <label>Data Nascimento</label>
                        <input class="w3-input w3-round" type="text" name="dataNasc" value="${c.dataNasc}"/>
                        <label>Data Óbito</label>
                        <input class="w3-input w3-round" type="text" name="dataObito" value="${c.dataObito}"/>
                        <label>Período</label>
                        <input class="w3-input w3-round" type="text" name="periodo" value="${c.periodo}"/>                        
                        </fieldset>
                    <br/>
                    <button class="w3-btn w3-purple w3-mb-2" type="submit">Register</button>
                </form>

                <footer class="w3-container w3-purple">
                    <h5>Generated by CompositoresApp - [<a href="/">Return</a>]</h5>
                </footer>
            
            </div>
    `
    return pagHTML
}

exports.compositorPage = function(compositor){
    var pagHTML = `
    <html>
    <head>
        <title>Compositor: ${compositor.id}</title>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="../w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Compositor ${compositor.id}</h1>
            </header>

            <div class="w3-container">
                <ul class="w3-ul w3-card-4" style="width:50%">
                    <li><b>Nome: </b> ${compositor.nome}</li>
                    <li><b>Id: </b> ${compositor.id}</li>
                    <li><b>Bio: </b> ${compositor.bio}</li>
                    <li><b>Data Nascimento: </b> ${compositor.dataNasc}</li>
                    <li><b>Data Óbito: </b> ${compositor.dataObito}</li>
                    <li><b>Período: </b> ${compositor.periodo}</li>
                </ul>
            </div>
            <footer class="w3-container w3-teal">
                <address>[<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
    return pagHTML
}

// -------------- Error Treatment ------------------------------
exports.errorPage = function(errorMessage, d){
    return `
    <p>${d}: Error: ${errorMessage}</p>
    `
}