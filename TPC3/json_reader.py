import json

def read_json_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            json_objects = [json.loads(line) for line in file]
    
    except FileNotFoundError:
        print(f'O ficheiro {file_path} não foi encontrado')
    except Exception as e:
        print(f'Ocorreu um erro: {e}')

    return json_objects

def verificar_entradas(registo):
    parametros_necessarios = ["_id", "title", "year", "cast", "genres"]

    for parametro in parametros_necessarios:
        if parametro not in registo:
            return False
    return True

def remover_entradas_incompletas(bd):
    bd_completo = [registo for registo in bd if verificar_entradas(registo)]
    return bd_completo

def pertenceA(ator, atores):
    encontrado = False
    i = 0
    while i < len(atores) and not encontrado:
        if atores[i]["nome"] == ator:
            encontrado = True
        i+=1
    
    return encontrado

def pertenceB(genero, generos):
    encontrado = False
    i = 0
    while i < len(generos) and not encontrado:
        if generos[i]["nome"] == genero:
            encontrado = True
        i+=1
    
    return encontrado

def calc_filmes(bd):
    i = 1
    for filme in bd:
        filme['_id'] = f'f{i}'
        i = i+1

def calc_atores(bd):
    atores = []
    contador = 1
    for registo in bd:
        for ator in registo.get('cast'):
            if not pertenceA(ator,atores):
                atores.append({
                    "id" : f'a{contador}',
                    "nome" : ator
                })
                contador += 1
    return atores

def calc_generos(bd):
    generos = []
    contador = 1
    for registo in bd:
        if registo.get('genres','erro') != 'erro':
            for genero in registo.get('genres'):
                if not pertenceB(genero,generos):
                    generos.append({
                        "id" : f'g{contador}',
                        "nome" : genero
                    })
                    contador += 1
    return generos

file_path = 'filmes.json'
myBD = read_json_file(file_path)
myBD = remover_entradas_incompletas(myBD)
filmes = calc_filmes(myBD)
atores = calc_atores(myBD)
generos = calc_generos(myBD)

novaBD = {
    "ocorrencias" : myBD,
    "atores" : atores,
    "generos" : generos
}

with open("bd.json", 'w') as f:
    json.dump(novaBD, f, indent=2)