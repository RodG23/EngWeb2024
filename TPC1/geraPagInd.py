import parse

bd = parse.parse("C:/Users/Utilizador/Desktop/UM/EngWeb2024/TPC1/MapaRuas-materialBase/texto")

for e in bd:
    f = open('MRBSite/MRB-'+str(e['meta']['número'])+'.html', 'w', encoding='utf-8')
    pagHTML = f"""
    <!DOCTYPE html> 
    <html>

        <head>
            <title>Rua {e['meta']['número']}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta charset="utf-8"/> 
            <link rel="stylesheet" href="w3.css"> 
        </head>

    <body>

        <div class="w3-container">
        </div>

        <div class="w3-bar w3-blue-gray">
        <button class="w3-bar-item w3-button" onclick="openTab('London')">Imagens - Atualidade</button>
        <button class="w3-bar-item w3-button" onclick="openTab('Paris')">Imagens - Esquiços</button>
        <button class="w3-bar-item w3-button" onclick="openTab('Tokyo')">Descrição</button>
        </div>

        <div id="London" class="w3-container city">
        <h2>London</h2>
        <p>London is the capital city of England.</p>
        </div>

        <div id="Paris" class="w3-container city" style="display:none">
        <h2>Paris</h2>
        <p>Paris is the capital of France.</p> 
        </div>

        <div id="Tokyo" class="w3-container city" style="display:none">
        <p></p>
        </div>

        <script>
        function openTab(cityName) {{
        var i;
        var x = document.getElementsByClassName("city");
        for (i = 0; i < x.length; i++) {{
            x[i].style.display = "none";  
        }}
        document.getElementById(cityName).style.display = "block";  
        }}
        </script>

    </body>

    </html>
    """
    f.write(pagHTML)
    f.close()